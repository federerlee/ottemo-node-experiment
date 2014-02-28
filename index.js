var hapi = require('hapi');
var mongoose = require('mongoose');
var cryptiles = require('cryptiles');
var pass = require('pwd');
var auth = require('./lib/auth');
var routes = require('./routes');

// Connect to MongoDB.
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/ottemo';
mongoose.connect(mongoUrl);

// Hapi plugin configuration.
// TODO: We should probably build some abstraction from this in 'lib/'.
var plugins = {
  yar: {
    cookieOptions: {
      password: cryptiles.randomString(32),
      // TODO: In production, cookie should be set with HttpOnly flag
      // and secure flag.
      isSecure: false
    }
  },
  travelogue: {
    urls: {
      failureRedirect: '/login',
      successRedirect: '/',
      excludePaths: ['/']
    }
  }
};

// Facebook oauth configuration. In production we will wan't to move this
// to something more robust and handle by exiting.
var facebookClientId = process.env.FACEBOOK_ID || '';
var facebookSecret = process.env.FACEBOOK_SECRET || '';
var facebookCallbackUrl = process.env.FACEBOOK_URL || '';
if (facebookClientId === '' || facebookSecret === '' || facebookCallbackUrl === '') {
  console.error('Facebook oauth variables not set!');
}
var facebookConfig = {
  clientID: facebookClientId,
  clientSecret: facebookSecret,
  callbackURL: facebookCallbackUrl
};

var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;
var server = hapi.createServer(host, port);

// Load handlebars templates.
server.views({
  engines: {
    html: 'handlebars'
  },
  path: 'static/templates'
});

// Load plugins.
server.pack.require(plugins, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

// Setup passport authentication.
server.auth.strategy('passport', 'passport');
var passport = server.plugins.travelogue.passport;
// Add strategies from 'lib/auth'.
passport.use(auth.createLocalStrategy());
passport.use(auth.createFacebookStrategy(facebookConfig));
passport.serializeUser(auth.serializeUser);
passport.deserializeUser(auth.deserializeUser);


// Adds routes to server.
server.route(routes);

// Simple logging. 
// TODO: Production will want to implement something more robust.
server.on('request', function(req) {
  console.log(req.info.remoteAddress, req.method, req.path)
});

// Start HTTP server.
server.start(function() {
  console.log('Ottemo up and running at http://%s:%d!', host, port);
});