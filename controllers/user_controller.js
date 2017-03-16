import express from 'express';
import commonValidations from '../src/validations/signup.js';
import db from '../models';
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();

function validateInput(data, otherValidations) {
    let { errors } = otherValidations(data);
    return db.User.findAll({
        where: { email: data.email, username: data.username }
    }).then(user => {
        if (user[0] === undefined) {
            return { isValid: isEmpty(errors) };
        }
        if (user[0].dataValues.email === data.email) {
            errors.email = 'Email is already registered';
        }

        if (user[0].dataValues.username === data.username) {
            errors.username = 'Username is already registered';
        }
        return { errors }
    })
}

router.post('/', (req, res) => {

    validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
        let fullname = req.body.fullname.trim();
        let split = fullname.split(" ")
        let nameArray = []
        for (let i = 0; i < split.length; i++) {
            var nameData = split[i].charAt(0).toUpperCase() + split[i].slice(1, split[i].length).toLowerCase();
            nameArray.push(nameData)
        }
        let finalNameData = nameArray.join(" ");
        let username = req.body.username.trim();
        let email = req.body.email.toLowerCase().trim();
        let password = req.body.password.toLowerCase().trim();
        let salt = bcrypt.genSaltSync(10);
        let hashedPassword = bcrypt.hashSync(password, salt);

        if (isValid) {
            db.User.create({
                fullname: finalNameData,
                username: username,
                email: email,
                password: hashedPassword
            }).then(function (data) {
                res.redirect('/login');
            });

        } else {
            res.status(400).json(errors);

        }
    });


})


export default router;