import express from 'express';
import db from '../models';
import bcrypt from 'bcryptjs';
import passport from 'passport';

let router = express.Router();

router.post('/', (req, res) => {
    const { identifier, password } = req.body;
    db.User.findOne({ where: { username: identifier } }).then(user => {
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                console.log("Right credentials")

            } else {
                res.status(404).json({ errors: { form: 'Wrong Password' } })
                console.log("wrong password")

            }
        } else {
            console.log("Not registered")
            res.status(404).json({ errors: { form: 'Username not registered' } })
        }
    })

});


export default router;