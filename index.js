'use strict'

//cargar un modulo con el require
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/curso_mean2',{useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
if (err){
    throw err;
}else{
    console.log("la base de datos está corriendo correctamente....");
}

});
