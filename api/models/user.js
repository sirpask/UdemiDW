'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

//nombre de la entidad + esquema > ojo pluraliza el User en Users para guardar colecciones
module.exports = mongoose.model('User', UserSchema);
