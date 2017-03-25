const express = require('express');
const db = require('../models');

let router = express.Router();


router.post('/userprofile', (req, res) => {
    let userID = req.body.userID
    db.User.findOne({ where: { id: userID } }).then(user => {
        res.send(user)
    })
})

module.exports = router;