import express from 'express';
import validateInput from '../src/validations/signup.js';
import db from '../models';
import passport from 'passport';
import bcrypt from 'bcryptjs';

const LocalStrategy = require('passport-local').Strategy;

let router = express.Router();

router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    let hashedPassword = bcrypt.hashSync(password, salt);
    if (isValid) {
        db.User.create({
            username: username,
            email: email,
            password: hashedPassword,
            salt: salt
        }).then(function (data) {
            console.log(data);
            res.redirect('/login');
        });

    } else {
        res.status(400).json(errors);
    }
})

// passport.use(new LocalStrategy(
//     (username, password, done) => {
//         User.getUserByUsername(username, (error, user) => {
//             if (error) throw error;
//             if (!user) {
//                 return done(null, false, { message: 'Username not registered' });
//             }

//             User.comparePassword(password, user.password, (error, isMatch) => {
//                 if (error) throw error;
//                 if (isMatch) {
//                     return done(null, user);
//                 } else {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }
//             });
//         });
//     }));

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//     User.getUserById(id, (error, user) => {
//         done(error, user);
//     });
// });

// router.post('/',
//     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/', failureFlash: true }),
//     (request, response) => {
//         response.redirect('/');
//     });

// router.get('/logout', (request, response) => {
//     request.logout();

//     request.flash('success_msg', 'You are logged out');

//     response.redirect('/');
// });

// function isLoggedIn(request, response, next) {
//     if (request.isAuthenticated()) {
//         return next();
//     } else {
//         request.flash('error_msg', "You are not logged in")
//         response.redirect('users/login')
//     }
// }

export default router;