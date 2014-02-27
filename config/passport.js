/*
 * config/passport.js
 *
 * @description :: passport configuration for authentication
 * @docs        :: 
 */

var config = require('./oauth.js'),  // create your own oauth.js based on config/oauth-sample.js
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  bcrypt = require('bcrypt');

passport.serializeUser(function (visitor, done) {
  done(null, visitor[0].id);
});

passport.deserializeUser(function (id, done) {
  Visitor.findByID(id, function (err, visitor) {
    done(err, visitor);
  });
});

passport.use(new LocalStrategy(
  function (email, password, done) {
    Visitor.findOneByEmail(email).done(function (err, visitor) {
      console.log('Found user: ' + email);
      console.log('Password: ' + password);
      if (err) {
        return done(null, err); 
      }
      if ((!visitor) || (visitor.length < 1)) {
        return done(null, false, {
          message: 'Email Address not found: ' + email
        });
      }
      bcrypt.compare(password, visitor.password, function (err, res) {
        if (!res) {
          return done(null, false, { message: 'Invalid Password' });
        }
        console.log('Password Validated');
        return done(null, visitor);
      });
    });
  })
);

passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));


module.exports = {
  express: {
    customMiddleware: function (app) {
      console.log('Middleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
