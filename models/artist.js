'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

//nombre de la entidad (objeto que vamos a usar y lo componene artists)+ esquema > ojo pluraliza el User en Users para guardar colecciones
module.exports = mongoose.model('Artist', ArtistSchema);
