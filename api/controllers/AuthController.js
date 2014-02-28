/**
 * api/controllers/AuthController.js 
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
      console.log(JSON.stringify(visitor));
      if ((err) || (!visitor)) {
        res.redirect('/login');
        console.log('Houston, we have a problem: ' + info);
        return;
      }
      req.logIn(visitor, function (err) {
        if (err) {
          res.redirect('/login');
        }
        console.log('Successful Login');
        return res.redirect('/visitor/profile/' + visitor.id);
      });
    })(req, res);
  },

  facebook: function (req, res) {
    passport.authenticate('facebook')(req, res);
  }, 

  facebookCallback: function (req, res) {
    passport.authenticate('facebook', {  successRedirect: '/',
                                         failureRedirect: '/login',
                                         failureFlash: true })(req, res, function () {
                                            res.redirect('/');
                                          });
  },

  logout: function (req, res) {
    req.logout();
    console.log('logout successful');
    res.redirect('/');
  },

 // TODO: clean this up
  _config: {}
  
};

module.exports.blueprints = {
  actions: true,
  rest: true,
  shortcuts: true
};
