'use strict'

//cargar un modulo con el require
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977

mongoose.connect('mongodb://localhost:27017/curso_mean2',{useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
if (err){
    throw err;
}else{
    console.log("la base de datos está corriendo correctamente....");

    //poner al servidor a escuchar
    app.listen(port, function(){
        console.log("servidor del api rest de musica escuchando en http://localhost:"+port)
    });
}

});
