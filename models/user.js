var mongoose = require('mongoose');
var pass = require('pwd');

// TODO: This is going to need to change
// to support oauth.
var UserSchema = new mongoose.Schema({
  email_addr: {
    type: String,
    unique: true,
    required: true
  },
  is_active: {
    type: Boolean,
    default: false,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  password_hash: {
    type: String,
    required: true
  },
  password_salt: {
    type: String,
    required: true
  }
});

// TODO: Schema validations.

var User = mongoose.model('User', UserSchema);

// TODO: There is probably a better way to register your own
// functions in mongoose, we should use that.
User.helpers = {};
User.helpers.createUser = function(email, first, last, password, callback) {
  var user = new User({
    email_addr: email,
    first_name: first,
    last_name: last,
    is_active: true
  });
  pass.hash(password, function(err, salt, hash) {
    if (err) {
      return callback(null, err);
    }
    user.password_hash = hash;
    user.password_salt = salt;
    user.save(function(err) {
      return callback(user, err);
    });
  });
};

module.exports = User;