'use strict'

//libreria de control de tokens
var jwt = require('jwt-simple');
//liberira para hacer expirar el token
var moment = require('moment');
var secret = 'clave_secreta_curso';

                           //envio, respuesta y next es para salir del midw
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'La peticion no tiene la cabecera de autenticacion'});

    }
     //con replace quitas las comillas dobnles y simples que pueda tener el string   /g es que vaya hasta el final de la linea y las cambghiamos por nada
    var token = req.headers.authorization.replace(/['"]+/g, '');

    //try es para capturar el error en caso de que se de a la hora de codificar el token
    try{
        var payload = jwt.decode(token, ' ', secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'el token ha expirado'});
        }
    }catch(ex){
        //console.log(ex);
        return res.status(404).send({message: 'el token no es valido'});
    }

    req.user = payload;

    next();
};

//ahora habra que usarlos en una ruta  (abrir user.js)
