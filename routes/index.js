var express = require('express');
var router = express.Router();
var Mailjet = require('node-mailjet').connect('b3986e30a129eeb3c0e06fc7f455ef6c', '022b92193d4c18f4084620611428409e');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/travel', function(req, res, next) {
    res.render('travel');
});

router.get('/learn', function( req, res, next){
    res.render('learn');
})

router.get('/ENindex', function(req, res, next) {
    res.render('ENindex', {layout:'ENLayout.handlebars'});
});

router.get('/datenschutz', function(req, res, next) {
    res.render('datenschutz', {layout:'Layout.handlebars'});
});

router.get('/privatePolicy', function(req, res, next) {
    res.render('privatePolicy', {layout:'ENLayout.handlebars'});
});

router.post('/travel',function(req,res,next){
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const age = req.body.age;
    const duration = req.body.duration;
    const experience = req.body.experience;


    function testEmail (name, surname,age) {
        Email = {};
        Email.FromName = 'bbp';
        Email.FromEmail = 'betterbackpacking@gmail.com';
        Email.Subject = 'EmailVerification';
        Email.Recipients = [{Email: email}];
        Email['Html-Part'] = name + surname + age;


        Mailjet.post('send')
            .request(Email);
    }

    testEmail(name, surname, age);
    res.render('travel', {layout:'Layout.handlebars'});

})

module.exports = router;
