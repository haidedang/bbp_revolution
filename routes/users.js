var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var randomstring = require('randomstring');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "haiduc.dang91@gmail.com",
        pass: "Mpi1991nv!"
    }
});

var User = require('../models/user');

//Register
router.get('/register', function(req, res, next) {
  res.render('register');
});

//Login
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.use(expressValidator({
        customValidators: {
            isUsernameAvailable(username) {
                return new Promise((resolve, reject) => {
                    User.findOne({ username: username }, (err, user) => {
                        if (err) throw err;
                        if(user == null) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            },
            isEmailAvailable(email){
                return new Promise((resolve, reject) => {
                    User.findOne({ email: email }, (err, user) => {
                        if (err) throw err;
                        if(user == null) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                });
            }
        }
    })
);



// Register User
router.post('/register/', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // Validation
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required.').notEmpty();
    req.checkBody('username', 'Username already in use').isUsernameAvailable();
    req.checkBody('email', 'Email is not valid.').isEmail();
    req.checkBody('email', 'Email already in use').isEmailAvailable();
    req.checkBody('password', 'Password is required').notEmpty();

    // generate random string
    const secretToken = randomstring.generate();

    req.asyncValidationErrors().then(() => {
        //no errors, create user
        const newUser = new User({
            email: email,
            username: username,
            password: password,
            secretToken: secretToken
        });


        User.createUser(newUser, (err, newUser) => {

            console.log("New user:", newUser);

            var authenticationURL = 'http://localhost:3000/users/verify_email?token=' + newUser.secretToken;
            var helper = require('sendgrid').mail;
            var fromEmail = new helper.Email('betterbackpacking@gmail.com');
            var toEmail = new helper.Email(newUser.email);
            var subject = 'Confirm your email';
            var content = new helper.Content('text/html', '<a target=_blank href=\"' + authenticationURL + '\">Confirm your email</a>');
            var mail = new helper.Mail(fromEmail, subject, toEmail, content);

            var sg = require('sendgrid')('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');
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

            sg.API(request, function (error, response) {
                if (error) {
                    console.log('Error response received');
                }
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
            });


        });

        req.flash('success_msg', 'Pls verify your email.');
        res.redirect('/users/login');

    }).catch((errors) => {

        if(errors) {
            res.render('register', {
                errors: errors
            });
        };
    });

});

router.get('/verify_email', function(req,res) {
    console.log('verify_email token: ',req.query.token);

    User.findOne({ secretToken: req.query.token }, function(err, user) {
        if (err) { return console.error(err); }
        console.dir(user);

        user.active = true;
        user.save(function (err) {
            if (err) return console.error(err);
            console.log('succesfully updated user');
            console.log(user);


            var helper = require('sendgrid').mail;
            var fromEmail = new helper.Email('betterbackpacking@gmail.com');
            var toEmail = new helper.Email(user.email);
            var subject = 'Email confirmed';
            var content = new helper.Content('text/html', 'Awesome! You are a badass!');
            var mail = new helper.Mail(fromEmail, subject, toEmail, content);

            var sg = require('sendgrid')('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');
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

            sg.API(request, function (error, response) {
                if (error) {
                    console.log('Error response received');
                }
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
            });



            //update page
        });
    });

    res.render('index');
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            // Check if User exists
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }
            // Check if password is correct
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
            // Check if account has been verified
            if (!user.active){
                return done(null, false, {message:'You need to verify your email first.'});
            }

        });

    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
    function(req, res) {
        res.redirect('/');
    });

router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});



module.exports = router;
