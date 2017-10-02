var express = require('express');
var router = express.Router();
var Mailjet = require('node-mailjet').connect('b3986e30a129eeb3c0e06fc7f455ef6c', '022b92193d4c18f4084620611428409e');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {layout:'ENlayout'});
});

router.get('/travel', function(req, res, next) {
    res.render('travel');
});

router.get('/learn', function( req, res, next){
    res.render('learn');
})

router.get('/ENindex', function(req, res, next) {
    res.render('ENindex');
});

router.get('/datenschutz', function(req, res, next) {
    res.render('datenschutz');
});

router.get('/privatePolicy', function(req, res, next) {
    res.render('privatePolicy');
});

router.post('/travel',function(req,res,next){
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const age = req.body.age;
    const duration = req.body.duration;
    const experience = req.body.experience;
    const fitness = req.body.fitness;
    const activities = req.body.activities;
    const accommodation = req.body.accommodation;
    const company = req.body.company;
    const message = req.body.message;


    function testEmail (name, surname, email, age, duration, experience, fitness, activities, accommodation, company, message){
        Email = {};
        Email.FromName = name;
        Email.FromEmail = 'betterbackpacking@gmail.com';
        Email.Subject = 'Kundenanfrage';
        Email.Recipients = [{Email: 'betterbackpacking@gmail.com'}];
        Email['Html-Part'] = 'name: ' + name + '<hr>' + 'surname: ' + surname + '<hr>' + 'email: ' + email + '<hr>' + 'age: ' + age + '<hr>' +
                'duration: ' + duration + '<hr>' + 'experience: ' + experience + '<hr>'+ 'fitness: ' + fitness + '<hr>' +
                    'activities: ' + activities + '<hr>' +'accommodation: ' + accommodation + '<hr>' +'company: ' + company + '<hr>' +'message: ' + message;


        Mailjet.post('send')
            .request(Email);
    }

    testEmail (name, surname, email, age, duration, experience, fitness, activities, accommodation, company, message);
    res.render('contact-form-thank-you');

});

router.post('/contact' , function(req,res,next){
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;



    function testEmail (name, email, phone, message) {
        Email = {};
        Email.FromName = name;
        Email.FromEmail = 'betterbackpacking@gmail.com';
        Email.Subject = 'Kundenanfrage';
        Email.Recipients = [{Email: 'betterbackpacking@gmail.com'}];
        Email['Html-Part'] = 'name: ' + name + '<hr>' + 'email: ' + email + '<hr>'
        + 'phone: ' + phone + '<hr>' + 'message: ' + message;




        Mailjet.post('send')
            .request(Email);
    }

    testEmail(name, email, phone, message);
    res.render('contact-form-thank-you');

});


module.exports = router;
