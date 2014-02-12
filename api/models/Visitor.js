/**
 * Visitor.js
 *
 * @description :: Visitor model 
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {
  attributes: {

    email: {
      type: 'String',
//      lowercase: true,
      required: true,
      unique: true
    },

    isActive: {
      type: 'Boolean',
      defaultsTo: true 
    },

    isMember: {
      type: 'Boolean',
      defaultsTo: false
    },
    
    fname: {
      type: 'String',
    },

    lname: {
      type: 'String',
    },

    nickname: {
      type: 'String'
    },

    group: {
      type: 'String',
      enum: ['Visitor', 'Member', 'Admin', 'Retired'],
      defaultsTo: 'Visitor',
    },

    password: {
      type: 'String',
      required: true
    },

    tmpPass: {
      type: 'Boolean',
      defaultsTo: false
    },

    // attempting to add association
    // A visitor may have many addresses
    addresses: {
      collection: 'visitoraddress',
      via: 'visitor'
    },

    // a visitor may have many shipping addresses
    shippingAddresses: {
      collection: 'ShippingAddress',
      via: 'visitor'
    }

  },

  // override toJSON and remove password from returned JSON
  toJSON: function () {
    var foo = this.toObject();
    delete foo.password;
    return foo;

  },

  // encrypt the password before we store in db
  beforeCreate: function (visitor, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(visitor.password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        } else {
          visitor.password = hash;
          cb(null, visitor);
        }
      });
    });
  }

};
