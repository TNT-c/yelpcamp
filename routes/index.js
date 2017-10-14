var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/userModel')
var LocalStrategy = require('passport-local');
var app = require('../app');


// GET Home page
router.get('/', function(req, res, next) {
  // console.log(currentUser);
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/camps',
  failureRedirect: '/login'
  }), function(req, res){
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

  // var userName = req.body.username;
  // var password = req.body.password;
  //
  // User.findOne({username: userName, password: password}, function(err, user){
  //   if(err){
  //     console.log(err);
  //     return res.status(500).send();
  //   }
  //   if(!user){
  //     return res.status(404).send();
  //   }
  //   return res.status(200).send(user);
  // });

// Auth routes
router.get('/register', function(req, res) {
  res.render('register');
});
// Register new user
router.post('/register', function(req, res){



  //  ================================================
  //  Colt's way
    var userName = req.body.username;
    var password = req.body.password;
    var newUser = new User ({
      username: userName,
      password: password
    });

    User.register(newUser, password, function(err, user){
      if(err){
        console.log(err);
        return res.render('register');
      }
      passport.authenticate('local')(req,res, function(){
        res.redirect('/camps');
      });
    });


  // newUser.save(function(err, data){
  //     if(err){
  //       console.log(err);
  //     } else {
  //       console.log(data);
  //       res.redirect('/camps');
  //     }
  //   });
  console.log(newUser);
});


module.exports = router;
