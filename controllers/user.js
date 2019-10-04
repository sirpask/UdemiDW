'use strict'
var bcrypt = require('bcrypt-nodejs'); // para guardar la contraseña ya cifrada
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas (req, res){
      res.status(200).send({
          message: 'Probando una accion del controlador de usuarios del api rest con Node Y mongo'
      });
}

function saveUser(req, res){
    var user = new User();

    //para recoger todos los datos que nos lleguen por post >params.name prams.description ...
    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password){
        //cifrar contraseña y guardar datos
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                //Guardar usuarios
                user.save((err, userStored) => {
                    if (err){
                        res.status(500).send({message: 'Error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                });

            }else{
                res.status(200).send({message: 'Rellena todos los campos'});
            }
        });
    }else{
        res.status(200).send({message: 'Introduce la contraseña'});
    }

}

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                //comprobar la contraseña
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        //devolver los datos del usuario lofgeado
                        if (params.gethash){
                            //devolver un tokern de jwt con los parametros del usuario
                            res.status(200).send({
                                token: jwt.createToken(user)

                            });
                        }else {
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'el usuario no ha podido logearse'});
                    }
                });
            }
        }
    });

}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
    });

}

function uploadImage(req, res){
    var userId = req.params.id;
    var file_name = 'No subido...';
    console.log(file_name);

    if(req.files){
        var file_path = req.files.image.path;
        console.log(file_path);
        //para recortar solo el nombre del fichero y no un churro
        var file_split = file_path.split('/')
        var file_name = file_split[2];
        console.log(file_split);
        console.log(file_name);

        //para sacar la extension de la imagen:
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];

        console.log(file_ext);
    }else {
        res.status(200).send({message: 'No has subido ninguna imagen...'});
    }

}

//exportar metodos para uso de la base de datos
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage

};

//luego hay que crear una ruta para cada metodo en user.js (routes)
