'use strict'

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

//modulo de paginacion
var mongoosePaginate = require('mongoose-pagination');


//para trabajar con el sistema de ficheros del sistema: fs file systema:
var fs = require('fs');
var path = require('path');


function getArtist(req, res){
    //recoger el parametro de la url:
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err){
            res.status(500).send({message: 'Error en la peticion.'});
        }else{
            if(!artist){
                res.status(404).send({message: 'El artista no existe'});
            }else{
                res.status(200).send({artist});
            }

        }

    });
}

function saveArtist(req, res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if (err){
            res.status(500).send({message: 'Error al guardar el artista'})
        }else{
            if (!artistStored){
                res.status(404).send({message: 'El artista no ha sido guardado'});
            }else{
                res.status(200).send({artist: artistStored});

            }
        }

    });

}


function getArtists(req, res){
    //al ser un parametro opcional, se hace un if:
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, total){
        if(err){
            res.status(500).send({message: 'Error en la peticion.'});
        }else{
            if(!artists){
                res.status(404).send({message: 'No hay artistas !!'})
            }else{
                return res.status(200).send({
                    total_items: total,
                    artists: artists
                });
            }

        }
    });
}

function updateArtist(req, res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion.'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message: 'el artista no ha sido actualizado'})
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }


    });


}

//para borrar de forma recursiva artista/ album

function deleteArtist(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el artista.'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message: 'el artista no ha sido eliminado'});
            }else{
//buscar en todos los albums donde en el campo artista tengan este id
                  Album.find({artist: artistRemoved._id}).remove((err, albumRemoved) => {
                      if(err){
                          res.status(500).send({message: 'Error al eliminar el album.'});
                      }else{
                          if(!albumRemoved){
                              res.status(404).send({message: 'el album no ha sido eliminado'});
                          }else{
                              Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                                  if(err){
                                      res.status(500).send({message: 'Error al eliminar la cancion.'});
                                  }else{
                                      if(!songRemoved){
                                          res.status(404).send({message: 'la cancion no ha sido eliminada'});
                                      }else{
                                          res.status(200).send({artist: artistRemoved});
                                      }
                                    }
                                });
                                }
                            }

                    });
                }
        }
    });
}

function uploadImage(req, res){
var artistId = req.params.id;
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
            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) => {
                if(!artistUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                }else{
                    res.status(200).send({artist: artistUpdated});
                }

            });
        }else{
            res.status(200).send({message: 'extension del archivo no valida...'});
        }

    }else {
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }

}



module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage
};
