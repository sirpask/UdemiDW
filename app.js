'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');
var song_routes = require('./routes/song');

//app.use(bodyParser.urlencoded({extended:false}));
//app.use(bodyParser.json());

//para canciones grandes
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: false, parameterLimit:50000}));

//configurar cabeceras http

//rutas base bodyParser
    //esto es una direccion de la url para que aglutine a todas las peticiones de la api (hay que poner siempre:)
    //http://localhost:3977/api/probando-controlador  (me refiero a ese /api)

app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api', song_routes);

//comentamos esta ruta por que era de ejemplo.
//app.get('/pruebas', function(req, res){
//    res.status(200).send({message: 'Bienvenido al curso de Victor robles'});
//});

module.exports = app;
