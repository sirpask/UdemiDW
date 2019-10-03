'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AlbumSchema = Schema({
    tittle: String,
    description: String,
    year: Number,
    image: String,
    Artist: {type: Schema.ObjetId, ref: 'Artist'}
});

//nombre de la entidad + esquema > ojo pluraliza el User en Users para guardar colecciones
module.exports = mongoose.model('Album', AlbumSchema);
