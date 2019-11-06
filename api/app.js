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

//configurar cabeceras http   *mirar abajo hay mas explicacion
app.use((req, res, next) => {
    //permitirmos el acceso a todos los dominios, acceso a nuestra api
    /*
    Access-Control-Allow-Origin: Para controlar quien puede consumir mi API

    Access-Control-Allow-Headers: Para configurar los headers que acepta la API

    Access-Control-Allow-Methods: Para declarar los métodos que acepta el API
    */
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});



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

/* explicacion CORS

El Intercambio de Recursos de Origen Cruzado (CORS) es un mecanismo que utiliza cabeceras HTTP adicionales para permitir que un user agent obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece. Un agente crea una petición HTTP de origen cruzado cuando solicita un recurso desde un dominio distinto, un protocolo o un puerto diferente al del documento que lo generó.

Un ejemplo de solicitud de origen cruzado: el código JavaScript frontend de una aplicación web que es localizada en http://domain-a.com utiliza XMLHttpRequest para cargar el recurso http://api.domain-b.com/data.json.

Por razones de seguridad, los exploradores restringen las solicitudes HTTP de origen cruzado iniciadas dentro de un script. Por ejemplo, XMLHttpRequest y la API Fetch siguen la política de mismo-origen. Ésto significa que una aplicación que utilice esas APIs XMLHttpRequest sólo puede hacer solicitudes HTTP a su propio dominio, a menos que se utilicen cabeceras CORS.

El W3C Grupo de Trabajo de Aplicaciones Web recomienda el nuevo mecanismo de Intercambio de Recursos de Origen Cruzado (CORS, por sus siglas en inglés). CORS da controles de acceso a dominios cruzados para servidores web y transferencia segura de datos en dominios cruzados entre navegadores y servidores Web. Los exploradores modernos utilizan CORS en un  contenedor API (como XMLHttpRequest o Fetch) para ayudar a mitigar los riesgos de solicitudes HTTP de origen cruzado.
*/
