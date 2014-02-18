/**
 * AuthController.js 
 *
 * @description :: a controller to hold passport methods
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');
module.exports = {  

  register: function (req, res) {
    res.view('auth/register');
  },

//  create: function (req, res) {
    

// },

  login: function (req, res) {
    res.view('auth/login');
  },

  process: function (req, res) {
    passport.authenticate('local', function (err, visitor, info) {
      if ((err) || (!visitor)) {
        res.redirect('/login');
        console.log('Houston, we have a problem: ' + info + '\nError: ' + err);
        return;
      }
      req.login(visitor, function (err) {
        if (err) {
          res.redirect('/login');
        }
        console.log('Successful Login');
        return res.redirect('/');
      });
    })(req, res);
  },

  logout: function (req, res) {
    req.logout();
    res.send('logout successful');
  },

 // TODO: clean this up
  _config: {}
  
};

module.exports.blueprints = {
  actions: true,
  rest: true,
  shortcuts: true
};
