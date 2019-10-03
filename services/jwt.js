'use strict'

//libreria de control de tokens
var jwt = require('jwt-simple');
//liberira para hacer expirar el token
var moment = require('moment');

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name:
    };

}; 
