/* 
 * api/policies/authenticated.js
 *
 * @description :: policy for authentication
 * @docs        :: TODO authentication documentation
 *
 */

module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.send(403, {
      message: 'Not Authorized'
    });
  }
};
