'use strict'

//libreria de control de tokens
var jwt = require('jwt-simple');
//liberira para hacer expirar el token
var moment = require('moment');
var secret = 'clave_secreta_curso';

exports.createToken = function(user){
    var payload = {            //datos a codificar para el tokens
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),                                              //fecha de creacion del token
        exp: moment().add(30, 'days').unix                                                              //fecha de expiracion
    };

      return jwt.encode(payload, secret);       //secret es una clave secreta para hacer el hash
};


//se podrian hacer mas metodos para descifrar tokens etc... depende del uso.
