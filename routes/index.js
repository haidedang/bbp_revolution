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

module.exports = router;
