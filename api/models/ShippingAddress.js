/**
 * @module ShippingAddress.js
 *
 * @description :: Visitor Shipping addresses
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    visitor: {
      model: 'visitor'
    },

    ship_line_1: {
      type: 'String',
      required: true
    },

    ship_line_2: {
      type: 'String',
      required: true
    },

    ship_suite: {
      type: 'String'
    },

    ship_city: {
      type: 'String',
      required: true
    },

    ship_state: {
      type: 'String',
      required: true
    },

    ship_zip: {
      type: 'Integer',
      len: '5',
      required: true
    }

  }

};

