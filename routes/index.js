var express = require('express');
var router = express.Router();

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

module.exports = router;
