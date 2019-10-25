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
    if (!albumId) {
        Album.find({},(err,album) => {
            if (err){
                res.status(500).send({message: 'Error en la peticion get album.'});
            }else{
                res.status(200).send({album});
            }
        });
    }else{


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
    var artistId = req.params.artist;
    console.log(artistId);
    if(!artistId){
        //sacar todos los albums de la base de datos
        var find = Album.find({}).sort('titulo');
    }else{
        //sacar los albus de un artista concreto de la bbdd
        var find = Album.find({artist: artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err, albums) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion.'});
        }else{
            if(!albums){
                res.status(404).send({message: 'No hay albumas2 !!'})
            }else{
                res.status(200).send({albums});
            }
        }

    });
}

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion.'});
        }else{
            if(!albumUpdated){
                res.status(404).send({message: 'No hay albumUpdated !!'})
            }else{
                res.status(200).send({album: albumUpdated});
            }
        }
    });

}

function deleteAlbum(req, res){
    var albumId = req.params.id;

    //buscar en todos los albums donde en el campo artista tengan este id
      Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
          if(err){
            res.status(500).send({message: 'Error al eliminar el album.'});
            }else{
                if(!albumRemoved){
                  res.status(404).send({message: 'el album no ha sido eliminado'});
                  }else{
                      Song.find({album: albumRemoved._id}).deleteMany((err, songRemoved) => {
                      if(err){
                          res.status(500).send({message: 'Error al eliminar la cancion.'});
                        }else{
                        if(!songRemoved){
                              res.status(404).send({message: 'la cancion no ha sido eliminada'});
                            }else{
                                res.status(200).send({album: albumRemoved});
                                  }
                            }
                        });
                    }
                }
            });
}

function uploadImage(req, res){
var albumId = req.params.id;
var file_name = 'No subido ...';

//¿hay ficheros en la peticion?

    if(req.files){
        var file_path = req.files.image.path; 
    //para recortar solo el nombre del fichero y no un churro
        var file_split = file_path.split('/')
        var file_name = file_split[2];
    //para sacar la extension de la imagen:
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
            console.log(albumId);
            console.log(file_name);
            Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
                if(!albumUpdated){
                    res.status(404).send({message: "no se ha podido actualizar el album"});
                }else{
                    res.status(200).send({album: albumUpdated});
                }

            });
        }else{
            res.status(200).send({message: 'extension del archivo no valida...'});
        }

    }else {
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }

}

function getImageFile(req, res) {   // ((((vamos por aki, falla el path: Error: ENOENT: no such file or directory, stat '/home/sirpask/github/UdemiDW/path_file'))))
    var imageFile = req.params.imageFile;
    var path_file = './uploads/albums/'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));

        }else{
            res.status(200).send({message: 'No existe la imagen?...'});
    }

});

}




module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}
