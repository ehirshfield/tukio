const express = require('express');
const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./env_variable.js');

let router = express.Router();

router.post('/', (req, res) => {
    const { identifier, password } = req.body;
    db.User.findOne({ where: { username: identifier } }).then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, config.jwtSecret)
                res.json(token)
            } else {
                res.status(404).json({ errors: { form: 'Wrong Password' } })
            }
        } else {
            res.status(404).json({ errors: { form: 'Username not registered' } })
        }
    })

});



module.exports = router;