'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');

//permite hacer todas esas funciones get post put ...
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//para adjuntar archivos
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/albums'});

api.get('/album/:id?', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums);

api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);



module.exports = api;
