/**
 * VisitorAddress.js
 *
 * @description :: Primary Visitor address
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  
  attributes: {
   
    visitor: {
      model: 'visitor'
    }, 

    addr_line_1: {
      type: 'String',
      required: true 
    },

    addr_line_2: {
      type: 'String'
    },
    
    suite: {
      type: 'String',
      required: true 
    },

    city: {
      type: 'String',
      required: true
    },

    state: {
      type: 'String',
      required: true
    },

    // TODO: lets see if this works
    zip: {
      type: 'Integer',
      len: '5',
      required: true
    }

  }

};
