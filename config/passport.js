/*
 * config/passport.js
 *
 * @description :: passport configuration for authentication
 * @docs        :: 
 */

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
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

module.exports = {
  express: {
    customMiddleware: function (app) {
      console.log('Middleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
