// All the middleware
var middlewareObj = {};
var Camps = require('../models/campModel.js');

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //Is user logged in? Does user own campground?
    if(req.isAuthenticated()){
      Camps.findById(req.params.id, function(err, foundCamp) {
        if (err) {
          res.flash('warning', 'Campground not found');
          res.redirect('/camps')
        } else {
            if(foundCamp.author.id.equals(req.user._id)) {
              next();
            } else {
              res.flash('warning', "You don't have permission");
              res.redirect('back');
            }
          }
        });
      } else {
        res.redirect('back');
      }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('bad', 'Log In Required');
    res.redirect('/login');
}

module.exports = middlewareObj;
