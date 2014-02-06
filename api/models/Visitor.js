/**
 * Visitor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    email: {
      type: 'String',
      trim: true,
      lowercase: true,
      required: true,
      unique: true
    },

    isActive: {
      type: 'Boolean',
      default: false
    },

    isMember: {
      type: 'Boolean',
      default: false
    },
    
    fname: {
      type: 'String',
      trim: true,
      required: true
    },

    lname: {
      type: 'String',
      trim: true,
      required: true
    },

    nickname: {
      type: 'String',
      trim: true
    },

    group: {
      type: 'String',
      enum: ['Visitor', 'Member', 'Admin', 'Retired'],
      default: 'Visitor',
      required: true
    },

    hashedPassword: {
      type: 'String',
      trim: true
    },

    tmpPass: {
      type: 'Boolean',
      default: false
    }

  }

};
