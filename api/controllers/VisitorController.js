/**
 * VisitorController.js 
 *
 * @description :: 
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');

module.exports = {  
  
  register: function (req, res) {
    res.view('auth/register');
  },

  create: function (req, res, next) {

    // create a new visitor
    Visitor.create( req.params.all(), function visitorCreated (err, visitor) {
      passport.authenticate('local', function (err, visitor, info) {
        if ((err) || (!visitor)) {
          req.session.flash = {
            err: err
          }
          // redirect back to registration page
          return res.redirect('auth/register');
        }
        // redirect to profile page
        res.redirect('/visitor/profile/' + visitor.id);
      });

    })

  },

  // render the profile view
  profile: function (req, res, next) {
    Visitor.findOne(req.param('id'), function foundVisitor (err, visitor) {
      if (err) {
        return next(err);
      }
      if (!visitor) {
        return next();
      }
      res.view({
        visitor: visitor
      });
    });
  }

};
