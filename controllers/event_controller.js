import express from 'express';
import db from '../models';

let router = express.Router();

router.get('/saved-events', (req, res) => {
  let userID = req.params.userID;

    db.User_Events.findAll({
      where: {
        User_Id: userID
      }
    }).then((data) => {
      db.Event.findAll({
        where: {
          id: data.Event_Id
        }
      }).then((response) => {
        res.send(response);
      })
    })
})

// Saving an event
router.post('/event', (req, res) => {
  let eventTitle = req.body.title;
  let eventDate = req.body.date;
  let eventAddress = req.body.address;
  let eventVenue = req.body.venue;
  let userID = req.body.user_id;

  db.Event.find({
    title: eventTitle,
    localDate: eventDate,
    venue_name: eventVenue,
    venue_address: eventAddress
  }).then((data) => {
    if(!data){
      db.Event.create({
        title: eventTitle,
        localDate: eventDate,
        venue_name: eventVenue,
        venue_address: eventAddress
      }).then((response) => {
        db.User_Events.create({
          Event_Id: response.id,
          User_Id: userID
        }).then((data) => {
          res.send("User_Events instance created for NEW event!");
        });
      });
    }
    else {
      db.User_Events.create({
        Event_Id: data.id,
        User_Id: userID
      }).then((data) => {
        res.send("Created USER_EVENT for already saved event")
      });

    }

  });

});

//Increase commits by one
router.put('/event/:event_id/commit/:user_id/', (req, res) => {

  let userID = req.params.user_id;
  let eventID = req.params.event_id;

  db.User_Events.update({ hasCommited: true}, { where: {User_Id: userID, Event_Id: eventID, hasCommited: false}})
  .then((data) => {
    if (data){
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
        }
        else {
          res.send("Can't find it");
        }
      })

    }

  });
});


//Set the number of total commits -- For an admin
router.put('/:event_id/set-commit-total/:new_goal', (req, res) => {
  let eventID = req.params.event_id;
  let commitGoal = req.params.new_goal;

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
      }
      else {
        res.send("Error Can't find it");
      }
    });
});


export default router;
