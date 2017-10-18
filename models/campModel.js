var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var campSchema = new Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
});

var Camps = mongoose.model('Camps', campSchema);

module.exports = Camps;
