var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var campSchema = new Schema({
  name: String,
  image: String
});

var Camps = mongoose.model('Camps', campSchema);

module.exports = Camps;
