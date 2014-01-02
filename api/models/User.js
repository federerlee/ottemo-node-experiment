/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
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

    is_active: {
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
      enum: ['Visitor', 'Member', 'Admin'],
      default: 'Visitor',
      required: true
    },

    hashed_password: {
      type: 'String',
      trim: true
    },

    tmp_pass_flag: {
      type: 'Boolean',
      default: false
    }

  }

};
