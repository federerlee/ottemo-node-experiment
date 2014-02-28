exports.getLogin = function(req, res) {
  res.view('login');
};

exports.postLogin = function(req, res) {
  var passport = req.server.plugins.travelogue.passport;
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res);
};

exports.getFacebook = function(req, res) {
  var passport = req.server.plugins.travelogue.passport;
  passport.authenticate('facebook')(req, res);
};

exports.getFacebookCb = function(req, res) {
  var passport = req.server.plugins.travelogue.passport;
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, function() {
    res().redirect('/');
  });
};