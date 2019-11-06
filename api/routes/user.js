'use strict'

var exptess = require('express');
var UserController = require('../controllers/user');

var api = exptess.Router();
var md_auth = require('../middlewares/authenticated');

//para adjuntar archivos
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

//metodos de user.js controllers
api.get('/probando-controlador/:id',md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

//si el id lo queremos opcional le pondriamos :id?
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);

//md_auth.ensureAuth comprueba que el token es correcto, md_upload para poder cargar los datos de fichero que nos meten
//
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;

//ahora lo cargarameos en el fichero app.jsty
