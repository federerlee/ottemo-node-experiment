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
  function (username, password, done) {
    Visitor.findByUsername(email).done(function (err, visitor) {
      if (err) {
        return done(null, err); 
      }
      if (!visitor || visitor.length < 1) {
        return done(null, false, {
          message: 'Incorrect Email Address'
        });
      }
      bcrypt.compare(password, visitor[0].password, function (err, res) {
        if (!res) {
          return done(null, false, { message: 'Invalid Password' });
        }
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
