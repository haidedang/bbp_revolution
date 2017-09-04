var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var randomstring = require('randomstring');
var nodemailer = require('nodemailer');
var mongoose = require('mongoose');
var Mailjet = require('node-mailjet').connect('b3986e30a129eeb3c0e06fc7f455ef6c', '022b92193d4c18f4084620611428409e');


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

function handleError (err) {
    throw new Error(err.ErrorMessage);
}

function newContact (email) {
    mailjet.post('contact')
        .request({Email: email})
        .catch(handleError);
}

function testEmail (text, html) {
    email = {};
    email.FromName = 'Your Name';
    email.FromEmail = 'betterbackpacking@gmail.com';
    email.Subject = 'Test Email';
    email.Recipients = [{Email: 'haiduc.dang91@gmail.com'}];
    email['Html-Part'] = text;


    Mailjet.post('send')
        .request(email)
        .catch(handleError);
}

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
    // req.checkBody('email', 'Email already in use').isEmailAvailable();
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

            function testEmail (text) {
                Email = {};
                Email.FromName = 'bbp';
                Email.FromEmail = 'betterbackpacking@gmail.com';
                Email.Subject = 'EmailVerification';
                Email.Recipients = [{Email: newUser.email}];
                Email['Html-Part'] = text;


                Mailjet.post('send')
                    .request(Email)
                    .catch(handleError);
            }

            testEmail( '<a target=_blank href=' + authenticationURL + '>Confirm your email</a>');

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

            // mailjet

            function testEmail (text) {
                Email = {};
                Email.FromName = 'bbp';
                Email.FromEmail = 'betterbackpacking@gmail.com';
                Email.Subject = 'Email confirmed!';
                Email.Recipients = [{Email: user.email}];
                Email['text-Part'] = text;


                Mailjet.post('send')
                    .request(Email)
                    .catch(handleError);
            }

            testEmail( 'Awesome! You are a badass!');

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
    function(req, res){
        res.redirect('/');
    });

router.get('/logout', function(req, res){
    console.log('success')
    console.log(req.user.username);

    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
});

function loggedIn(req, res, next) {
    if (req.user) {
        console.log(req.user.username);
        next();
    } else {
        res.redirect('/users/login');
    }
}

router.get('/chat', loggedIn, function(req, res, next) {
    // req.user - will exist
    // load user orders and render them

    console.log(req.user.username);
    res.render('chat');

});

router.get('/', function(req, res){
    console.log(req.user.username)
    res.send(req.user.username);
})


module.exports = router;
