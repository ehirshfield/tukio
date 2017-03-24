import express from 'express';
import db from '../models';

let router = express.Router();


router.post('/save', (req, res) => {
    let userID = req.body.userID;
    let cardName = req.body.cardName;
    let cardNumber = req.body.cardNumber;
    let cardExp = req.body.cardExp;
    let cardSecurity = req.body.cardSecurity;
    let cardZip = req.body.cardZip;

    db.Credit_Card.find({
            where: {
                name: cardName,
                card_number: cardNumber,
                expiration: cardExp,
                security_code: cardSecurity,
                zip_code: cardZip
            }
        })
        .then((data) => {
            if (data) {
                res.send("Card already exists");
            } else {
                db.Credit_Card.create({
                    name: cardName,
                    card_number: cardNumber,
                    expiration: cardExp,
                    security_code: cardSecurity,
                    zip_code: cardZip,
                    UserId: userID

                }).then((response) => {
                    res.send("CC CREATED!!!");
                }).catch((error) => {
                    res.send(error);
                })
            }
        })

});

router.put('/update', (req, res) => {
    let userID = req.body.userID;
    let cardID = req.body.cardID;
    let cardName = req.body.cardName;
    let cardNumber = req.body.cardNumber;
    let cardExp = req.body.cardExp;
    let cardSecurity = req.body.cardSecurity;
    let cardZip = req.body.cardZip;

    db.Credit_Card.update({
        name: cardName,
        card_number: cardNumber,
        expiration: cardExp,
        security_code: cardSecurity,
        zip_code: cardZip
    }, {
        where: {
            id: cardID
        }
    }).then((data) => {
        res.send("CC UPDATED!");
    }).catch((error) => {
        res.send(error);
    })

});

export default router;