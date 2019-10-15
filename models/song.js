'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SongSchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {type: Schema.Types.ObjectId, ref: 'Album'}
});

//nombre de la entidad + esquema > ojo pluraliza el User en Users para guardar colecciones
module.exports = mongoose.model('Song', SongSchema);
