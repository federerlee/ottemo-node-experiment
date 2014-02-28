var login = require('./login');
var hapi = require('hapi');

module.exports = [{
  method: 'GET',
  path: '/',
  handler: getRoot
}, {
  method: 'GET',
  path: '/login',
  config: {
    auth: false,
    handler: login.getLogin
  }
}, {
  method: 'POST',
  path: '/login',
  config: {
    validate: {
      payload: {
        username: hapi.types.String(),
        password: hapi.types.String()
      },
    },
    auth: false,
    handler: login.postLogin
  }
}, {
  method: 'GET',
  path: '/login/facebook',
  config: {
    auth: false,
    handler: login.getFacebook
  }
}, {
  method: 'GET',
  path: '/auth/facebook/callback',
  config: {
    auth: false,
    handler: login.getFacebookCb
  }
}];

function getRoot(req, res) {
  res('Welcome to Ottemo');
}