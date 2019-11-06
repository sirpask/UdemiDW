'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AlbumSchema = Schema({
    tittle: String,
    description: String,
    year: Number,
    image: String,
    artist: {type: Schema.Types.ObjectId, ref: 'Artist'}
});

//nombre de la entidad + esquema > ojo pluraliza el User en Users para guardar colecciones
module.exports = mongoose.model('Album', AlbumSchema);
