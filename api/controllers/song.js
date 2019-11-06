'use strict'

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

//modulo de paginacion
var mongoosePaginate = require('mongoose-pagination');


//para trabajar con el sistema de ficheros del sistema: fs file systema:
var fs = require('fs');
var path = require('path');

function getSong(req, res){
    var songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err,song) => {
        if (err){
            res.status(500).send({message: 'Error en la peticion.'});
        }else{
            if(!song){
                res.status(404).send({message: 'La cancion no existe'});
            }else{
                res.status(200).send({song});
            }

        }

    });

}

function saveSong(req, res){
    var song = new Song();

    var params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = 'null';
    song.album = params.album;

    song.save((err, songStored) => {
        if (err){
            res.status(500).send({message: 'Error al guardar el songa'})
        }else{
            if (!songStored){
                res.status(404).send({message: 'El songa no ha sido guardado'});
            }else{
                res.status(200).send({song: songStored});

            }
        }

    });

}

function getSongs(req, res){
    //al ser un parametro opcional, se hace un if:
    var albumId = req.params.album;

    if (!albumId){
        var find = Song.find({}).sort('number');
    }else{
        var find = Song.find({album: albumId}).sort('number');
    }

    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec(function(err, songs){
        if (err){
            res.status(500).send({message: 'Error al guardar el songa'});
        }else{
            if (!songs){
                res.status(404).send({message: 'no hay canciones !!'});
            }else{
                res.status(200).send({songs});
            }
        }

    });
}

function updateSong(req, res){
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion.'});
        }else{
            if(!songUpdated){
                res.status(404).send({message: 'el album no ha sido actualizado'})
            }else{
                res.status(200).send({song: songUpdated});
            }
        }


    });


}


function deleteSong(req, res){
    var songId = req.params.id;
    Song.findByIdAndRemove(songId, (err, songRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar la cancion.'});
        }else{
            if(!songRemoved){
                res.status(404).send({message: 'la cancion no ha sido eliminada'});
            }else{
                res.status(200).send({song: songRemoved});
            }
        }
    });

}


function uploadFile(req, res){
var songId = req.params.id;
var file_name = 'No subido ...';
console.log(songId);

//¿hay ficheros en la peticion?

    if(req.files){
        var file_path = req.files.file.path;
    //para recortar solo el nombre del fichero y no un churro
        var file_split = file_path.split('/')
        var file_name = file_split[2];
    //para sacar la extension de la imagen:
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];
        console.log(file_name);
        console.log(file_ext);


        if (file_ext == 'mp3' || file_ext == 'ogg') {
                Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) => {
                if(!songUpdated){
                    res.status(404).send({message: 'no se ha podido actualizar la cancion'});
                }else{
                    res.status(200).send({song: songUpdated});
                }

            });
        }else{
            res.status(200).send({message: 'extension del archivo no valida...'});
        }

    }else {
        res.status(200).send({message: 'No existe el fichero de audio...'});
    }

}

function getSongFile(req, res) {   // ((((vamos por aki, falla el path: Error: ENOENT: no such file or directory, stat '/home/sirpask/github/UdemiDW/path_file'))))
    var songFile = req.params.songFile;
    var path_file = './uploads/songs/'+songFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));

        }else{
            res.status(200).send({message: 'No existe el fichero de audio?...'});
    }

});

}



module.exports = {
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile

};
