import express from 'express';
import commonValidations from '../src/validations/signup.js';
import db from '../models';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';

const LocalStrategy = require('passport-local').Strategy;

let router = express.Router();

function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);
    return db.User.findAll({
        where: { email: data.email }
    }).then(user => {
        if (user[0] === undefined) {
            return { isValid: isEmpty(errors) };
        }
        if (user[0].dataValues.email === data.email) {
            errors.email = 'Email is already registered';
        }
        return { errors }

    })
}

router.post('/', (req, res) => {

    validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
        let email = req.body.email.toLowerCase().trim();
        let password = req.body.password.toLowerCase().trim();
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(password, salt);

        if (isValid) {
            db.User.create({
                email: email,
                password: hashedPassword
            }).then(function(data) {
                res.redirect('/login');
            });

        } else {
            res.status(400).json(errors);
        }
    });


})


export default router;