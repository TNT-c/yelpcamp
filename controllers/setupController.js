var Camps = require('../models/campModel');
var mongoose = require('mongoose');

var starterCamps = [
  {
    name: 'Boulder Dash',
    image: 'https://www.nps.gov/zion/planyourvisit/images/South_CG_r_1.jpg'
  },
  {
    name: 'Boulder Run',
    image: 'https://www.nps.gov/zion/planyourvisit/images/South_CG_r_1.jpg'
  },
  {
    name: 'Boulder Stream',
    image: 'https://www.nps.gov/zion/planyourvisit/images/South_CG_r_1.jpg'
  },
  {
    name: 'Boulder Sprint',
    image: 'https://www.nps.gov/zion/planyourvisit/images/South_CG_r_1.jpg'
  }
];
function seedDB(){
    // Remove all campgrounds
    Camps.remove({}, function(err){
      if(err){
        console.log(err);
      }
      console.log('removed campgrounds');
      // Add campgrounds
      starterCamps.forEach(function(seed){
        Camps.create(seed, function(err, campground){
          if(err){
            console.log(err);
          } else {
            console.log('added campground');
          }
        });
      });
    });

}
module.exports = seedDB;
