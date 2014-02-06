/**
 * Visitor.js
 *
 * @description :: Visitor model 
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    email: {
      type: 'String',
//      trim: true,
//      lowercase: true,
      required: true,
      unique: true
    },

    isActive: {
      type: 'Boolean',
      defaultsTo: false
    },

    isMember: {
      type: 'Boolean',
      defaultsTo: false
    },
    
    fname: {
      type: 'String',
 //     trim: true,
      required: true
    },

    lname: {
      type: 'String',
//      trim: true,
      required: true
    },

    nickname: {
      type: 'String'
//      trim: true
    },

    group: {
      type: 'String',
      enum: ['Visitor', 'Member', 'Admin', 'Retired'],
      defaultsTo: 'Visitor',
      required: true
    },

    hashedPassword: {
      type: 'String'
//      trim: true
    },

    tmpPass: {
      type: 'Boolean',
      defaultsTo: false
    }

  }

};
