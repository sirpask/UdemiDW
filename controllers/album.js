'use strict'

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

//modulo de paginacion
var mongoosePaginate = require('mongoose-pagination');


//para trabajar con el sistema de ficheros del sistema: fs file systema:
var fs = require('fs');
var path = require('path');

function getAlbum(req, res){
    //recoger el parametro de la url:
    var albumId = req.params.id;

    //Album.findById(albumId, (err, album) => { el populare para decir que diga los datos de artis a la peticion
    //el path donde se van a guardar los datos de esa propiedad, nos va a cargar un objeto completo de artista asociado a album
    //exec lanza la consulta
    Album.findById(albumId).populate({path:'artist'}).exec((err,album) => {
        if (err){
            res.status(500).send({message: 'Error en la peticion get album.'});
        }else{
            if(!album){
                res.status(404).send({message: 'El albuma no existe'});
            }else{
                res.status(200).send({album});
            }

        }

    });
}

function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;
    album.tittle = params.tittle;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if (err){
            res.status(500).send({message: 'Error al guardar el album'})
        }else{
            if (!albumStored){
                res.status(404).send({message: 'El albuma no ha sido guardado'});
            }else{
                res.status(200).send({album: albumStored});

            }
        }

    });

}

function getAlbums(req, res){
    //vamos a recoger el artis id tambien
    var artisId = req.params.artist;
    if(!artisId){
        //sacar todos los albums de la base de datos
        var find = Album.find({}).sort('titulo');
    }else{
        //sacar los albus de un artista concreto de la bbdd
        var find = Album.find({artis: artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err, albums) => {

    }

    //al ser un parametro opcional, se hace un if:
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 3;

    Album.find().sort('name').paginate(page, itemsPerPage, function(err, albums, total){
        if(err){
            res.status(500).send({message: 'Error en la peticion.'});
        }else{
            if(!albums){
                res.status(404).send({message: 'No hay albumas !!'})
            }else{
                return res.status(200).send({
                    total_items: total,
                    albums: albums
                });
            }

        }
    });
}




module.exports = {
    getAlbum,
    saveAlbum
}
