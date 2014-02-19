/**
 * VisitorController.js 
 *
 * @description :: 
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {  
  
  register: function (req, res) {
    res.view('visitor/register');
  },

  create: function (req, res, next) {
    
    console.log('Attempting to create new Visitor');
    // create a new visitor
    Visitor.create(req.params.all(), function visitorCreated(err, visitor) {
      if ((err) || (!visitor)) {
        req.session.flash = {
          err: err
        };
        // redirect back to registration page
        console.log('Found an error, redirecting back to Registration Screen');
        return res.redirect('visitor/register');
      }  
      console.log('Created Visitor: ' + visitor.email);
      // redirect to profile page
      return res.redirect('/visitor/profile/' + visitor.id);
    });
  },

  // render the profile view
  profile: function (req, res, next) {
    Visitor.findOne(req.param('id'), function foundVisitor(err, visitor) {
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
