'use strict'

var exptess = require('express');
var UserController = require('../controllers/user');

var api = exptess.Router();

//metodos de user.js controllers
api.get('/probando-controlador', UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

module.exports = api;

//ahora lo cargarameos en el fichero app.js
