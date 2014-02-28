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
  console.log('Serilized: ' + visitor.fname + ' ' + visitor.lname);
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

passport.use(new FacebookStrategy({ clientID: config.facebook.clientID,
                                    clientSecret: config.facebook.clientSecret,
                                    callbackURL: config.facebook.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    console.log(JSON.stringify(profile));

    Visitor.findByID({ oauthID: profile.id }, function (err, visitor) {
      if (err) { console.log(err); }
      if (!err && visitor !== null) {
        console.log('Visitor is not null, and no errors.');
        done(null, visitor);
      } else {
        console.log('Attempting to create new Visitor in Ottemo');
        var tmpEmail = profile.username + '@facebook.com';
        visitor = new Visitor({
          email: tmpEmail,
          oauthID: profile.id,
          fname: profile.first_name,
          lname: profile.last_name
        });
        visitor.save(function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('saving visitor: ' + profile.displayName);
            done(null, visitor);
          }
        });
      }
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
