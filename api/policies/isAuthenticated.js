/* 
 * api/policies/isAuthenticated.js
 *
 * @description :: policy for authentication
 * @docs        :: TODO authentication documentation
 *
 */

var passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('bearer', {
    session: false
  },
  function (err, visitor, info) {
    if (req.isAuthenticated()) {
      return next();
    } 
    if (err) {
      return res.send(403, {
        error: 'Error: ' + info
      });
    }
    if (!visitor) {
      return res.send(403, {
        error: 'Invalid token' 
      });
    }
    if (visitor) {
//      sails.log(visitor);
      return next();
    }

    return res.forbidden('You are not permitted to perform this action.');

  })(req, res, next);
};
