'use strict'

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


//para trabajar con el sistema de ficheros del sistema: fs file systema:
var fs = require('fs');
var path = require('path');


function getArtist(req, res){
    
    console.log(req.method);    res.status(200).send({message: 'Metodo getArtist del controlador artist.js'});

}

module.exports = {
    getArtist
};
