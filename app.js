'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base bodyParser
    //esto es una direccion de la url para que aglutine a todas las peticiones de la api (hay que poner siempre:)
    //http://localhost:3977/api/probando-controlador  (me refiero a ese /api)
    
app.use('/api', user_routes);
app.use('/api', artist_routes);

//comentamos esta ruta por que era de ejemplo.
//app.get('/pruebas', function(req, res){
//    res.status(200).send({message: 'Bienvenido al curso de Victor robles'});
//});

module.exports = app;
