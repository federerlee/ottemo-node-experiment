var localStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;
var pass = require('pwd');
var User = require('../models/user');

// Error messages uses by authentiation functions.
var InvalidUsernamePasswordErrorMessage = 'Invalid e-mail address or password';

// Returns a new passport.js local strategy
exports.createLocalStrategy = function() {
  return new localStrategy(function(email, password, done) {
    User.findOne({
      'email_addr': email
    }, function(err, user) {
      if (err || !user) {
        return done(null, false, {
          'message': InvalidUsernamePasswordErrorMessage
        });
      }
      pass.hash(password, user.password_salt, function(err, hash) {
        // TODO: This should be a timebased comparison to prevent a possible timing attack.
        if (user.password_hash === hash) {
          return done(null, user);
        }
        return done(null, false, {
          'message': InvalidUsernamePasswordErrorMessage
        });
      });
    });
  });
};

// Returns a new passport.js facebook strategy.
exports.createFacebookStrategy = function(config) {
  return new facebookStrategy(config, function(accessToken, refreshToken, profile, done) {
    // TODO: Convert facebook profile into user profile.
    return done(null, profile)
  });
};

// TODO: Implement these passport.js functionalities better.
exports.serializeUser = function(user, done) {
  return done(null, {
    userId: user._id,
    userEmail: user.email_addr
  });
};

exports.deserializeUser = function(obj, done) {
  return done(null, obj);
};