/*
 * config/passport.js
 *
 * @description :: passport configuration for authentication
 * @docs        :: 
 */

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  //TwitterStrategy = require('passport-twitter').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  //GoogleStrategy = require('passport-google').Strategy,
  bcrypt = require('bcrypt');

passport.serializeUser(function (visitor, done) {
  done(null, visitor.id);
});

passport.deserializeUser(function (id, done) {
  Visitor.findByID(id, function (err, visitor) {
    done(err, visitor);
  });
});

passport.use(new LocalStrategy(
  function (email, password, done) {
    Visitor.findOneByEmail(email).done(function (err, visitor) {
      console.log('Found user: ' + visitor.email);
      console.log('Password: ' + password);
      if (err) {
        return done(null, err); 
      }
      if (!visitor || visitor.length < 1) {
        return done(null, false, {
          message: 'Incorrect Email Address'
        });
      }
      bcrypt.compare(password, visitor.password, function (err, res) {
       V if (!res) {
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
    oauth: {
      twitter: {
        key: process.env.TWITTER_OAUTH_KEY || '',
        secret: process.env.TWITTER_OAUTH_SECRET || ''
      },
      facebook: {
        key: process.env.FACEBOOK_OAUTH_KEY || '',
        secret: process.env.FACEBOOK_OAUTH_SECRET || ''
      },
      google: {
        key: process.env.TH_KEY || '',
        secret: process.env.FACEBOOK_OAUTH_SECRET || ''
      }
    },
    customMiddleware: function (app) {
      console.log('Middleware for passport');

      if (app.get('facebook-oauth-key')) {
        passport.use(new FacebookStrategy({
            clientID: app.get('facebook-oauth-key'),
            clientSecret: app.get('facebook-oauth-secret')
          },
          function (accessToken, refreshToken, profile, done) {
            done(null, false, {
              accessToken: accessToken,
              refreshToken: refreshToken,
              profile: profile
            });
          }
        ));
      }

      if (app.get('twitter-oauth-key')) {
        passport.use(new TwitterStrategy({
            consumerKey: app.get('twitter-oauth-key'),
            consumerSecret: app.get('twitter-oauth-secret')
          },
          function (token, tokenSecret, profile, done) {
            done(null, false, {
              token: token,
              tokenSecret: tokenSecret,
              profile: profile
            });
          }
        ));
      }
      
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
