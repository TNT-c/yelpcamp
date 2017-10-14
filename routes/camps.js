var express = require('express');
var router = express.Router();
var Camps = require('../models/campModel');
var passport = require('passport');
var User = require('../models/userModel')
var LocalStrategy = require('passport-local');
var app = require('../app');

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
// var camps = [
//   {name: "Salmon Creek", image: "https://www.nps.gov/zion/planyourvisit/images/South_CG_r_1.jpg"},
//   {name: "Rocky Ledge", image: "http://avaloncampground.com/wp-content/uploads/2013/07/Avalon-Campground-table-woods.png"},
//   {name: "Salmon Creek", image: "https://www.nps.gov/zion/planyourvisit/images/South_CG_r_1.jpg"},
//   {name: "Rocky Ledge", image: "http://avaloncampground.com/wp-content/uploads/2013/07/Avalon-Campground-table-woods.png"},
//   {name: "Salmon Creek", image: "https://www.nps.gov/zion/planyourvisit/images/South_CG_r_1.jpg"},
//   {name: "Rocky Ledge", image: "http://avaloncampground.com/wp-content/uploads/2013/07/Avalon-Campground-table-woods.png"},
//   {name: "Salmon Creek", image: "https://www.nps.gov/zion/planyourvisit/images/South_CG_r_1.jpg"},
//   {name: "Rocky Ledge", image: "http://avaloncampground.com/wp-content/uploads/2013/07/Avalon-Campground-table-woods.png"}
// ];

// GET camp page
router.get('/', function(req, res, next) {
  Camps.find({}, function(err, allCamps) {
    if (err) throw err;
    res.render('camps', { camps: allCamps});
  });
  // res.render('camps', { camps: camps});

});

// POST camp page
router.post('/', isLoggedIn, function(req, res, next) {
  if (req.body.id) {
    Camps.findByIdAndUpdate(req.body.id, {
      name: req.body.name, image: req.body.image
    }, function(err, camp) {
      if (err) throw err;
      return res.send('success');
    });
  }
  else {
    var newCamp = Camps({
      name: req.body.name,
      image: req.body.image
    });
    newCamp.save(function(err){
      if (err) {
        console.log(err);
      } else {
        res.redirect('/camps')
      }
    });
  }
});

// GET add new camp page
router.get('/new', isLoggedIn, function(req, res, next) {
  res.render('newcamp');
});

// SHOW - shows individual camps
router.get('/:id', function(req, res) {
  Camps.findById(req.params.id, function(err, camp) {
    if (err) {
      res.redirect('/');
    } else {
    res.render('camp', {camp: camp});
    }
  });
});

// UPDATE a camp
router.get('/:id/edit', function(req, res, next) {
  Camps.findById(req.params.id, function(err, camp) {
    if (err) throw err;

    res.render('editcamp', {camp: camp});
  });
});
// EDIT route
router.post('/:id', function(req, res){
  Camps.findByIdAndUpdate(req.params.id, req.body, function(err, updatedCamp){
    if(err){
      res.redirect("/camps");
    } else {
      res.redirect("/camps/" + req.params.id);
    }
  });
});

// DELETE a camp
router.post('/:id/delete', function(req, res, next){
  Camps.findByIdAndRemove({_id: req.params.id}).then(function(camp){
    res.redirect('/camps');
  });
});
module.exports = router;
