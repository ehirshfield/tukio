const express = require('express');
const db = require('../models');

let router = express.Router();


router.post('/saved-events', (req, res) => {
    let userID = req.body.userID;

    db.User_Events.findAll({
        where: {
            UserId: userID
        },
        include: db.Event
    }).then((result) => {
        res.send(result);
        return;
    })
    return;
})

// Saving an event
router.post('/event', (req, res) => {

    let eventTitle = req.body.title;
    let eventDate = req.body.date;
    let eventAddress = req.body.address;
    let eventVenue = req.body.venue;
    let userID = req.body.user_id;

    db.Event.find({
        where: {
            title: eventTitle,
            localDate: eventDate,
            venue_name: eventVenue,
            venue_address: eventAddress
        }
    }).then((data) => {
        if (!data) {
            db.Event.create({
                title: eventTitle,
                localDate: eventDate,
                venue_name: eventVenue,
                venue_address: eventAddress

            }).then((response) => {
                db.User_Events.create({
                    EventId: response.id,
                    UserId: userID
                }).then((data) => {
                    res.send(data);
                }).catch((error) => {
                    console.log(error);
                })
            }).catch((error) => {
                console.log(error);
            })
        } else {
            db.User_Events.create({
                EventId: data.id,
                UserId: userID
            }).then((data) => {
                res.send(data)
            }).catch((error) => {
                console.log(error);
            });

        }

    }).catch((error) => {
        console.log(error);
    });


});

//Increase commits by one
router.put('/commit', (req, res) => {

    let userID = req.body.userID;
    let eventID = req.body.eventID;

    db.User_Events.update({ hasCommited: true }, { where: { UserId: userID, EventId: eventID, hasCommited: false } })
        .then((data) => {
            if (data) {
                db.Event.find({
                    where: {
                        id: eventID
                    }
                }).then((eventRow) => {
                    if (eventRow) {
                        console.log("Number of commits: " + eventRow.commits);
                        let newCommitTotal = ((eventRow.commits) + 1);
                        eventRow.update({
                            commits: newCommitTotal
                        }).then((response) => {
                            res.send("Commits have been incremented!");
                        });
                    } else {
                        res.send("Can't find it");
                    }
                })

            }
        });
});

//Set the number of total commits -- For an admin
router.put('/:event_id/set-commit-total/:new_goal', (req, res) => {
    let eventID = req.body.event_id;
    let commitGoal = req.body.new_goal;

    db.Event.find({
        where: {
            id: eventID
        }
    }).then((eventRow) => {
        if (eventRow) {
            eventRow.update({
                commits_goal: commitGoal
            }).then((response) => {
                res.send("Commit goal is set!");
            });
        } else {
            res.send("Error Can't find it");
        }
    });
});



module.exports = router;