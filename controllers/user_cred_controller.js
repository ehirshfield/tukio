const express = require('express');
const db = require('../models');
const axios = require('axios');

let router = express.Router();


router.get('/userprofile', (req, res) => {
    db.User.findAll({ where: { id: 1 } }).then(user => {
        console.log(user)
    })
})


module.exports = router;