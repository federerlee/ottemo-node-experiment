/**
 * AuthController.js 
 *
 * @description :: a controller to hold passport methods
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');
module.exports = {  

  login: function (req, res) {
    res.view('auth/login');
  },

  process: function (req, res) {
    passport.authentication('local', function (err, visitor, info) {
      if ((err) || (!visitor)) {
        res.redirect('/login');
        return;
      }
      req.logIn(visitor, function (err) {
        if (err) {
          res.redirect('/login');
        }
        return res.redirect('/');
      });
    })(req, res);
  },

  logout: function (req, res) {
    req.logout();
    res.send('logout successful');
  },

  _config: {}
  
};
