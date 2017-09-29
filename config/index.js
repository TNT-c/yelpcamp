var configValues = require('./config');

module.exports = {
  getDbConnectionString: function() {
    return 'mongodb://' + configValues.uname + ':' + configValues.pword + '@ds123124.mlab.com:23124/udemyyelpcamp';
  }
}
