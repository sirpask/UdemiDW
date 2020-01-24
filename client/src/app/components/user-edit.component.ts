import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { GLOBAL } from '../services/global';

@Component({
    //que metadatos y que caracteristicas van a tener nuestro componentes
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
})

export class UserEditComponent implements OnInit{
    public titulo: string;
    public user:User;
    public identity;
    public token;
    public alertMessage;
    public url:string;

    constructor( private _userService: UserService ){
        this.titulo = 'Actualizar mis datos';
        //this.user = new User('','','','','','ROLE_USER','');  // inicializamos el Usuario vacio

        // LocalStorage
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;

    }

    ngOnInit(){

        console.log('user.edit.component.ts cargado');
    }

    onSubmit(){
      console.log(this.user);

      this._userService.updateUser(this.user).subscribe(
        response => {
        //  this.user = response.user;  (la base de datos (API) devuelve los valores viejos)
          if(!response.user){
            this.alertMessage = "El usuario no se ha actualizado";
          }else{

          //  this.user = response.user;
            localStorage.setItem('identity', JSON.stringify(this.user));

            //para cambiar el nombre del usuario en la cabecera de la pagina web,
            //creamos en app.component.html   </span id="identity_name"> y le asignamos un nombre directamente
            //con la propiedad document.getElementById
            document.getElementById("identity_name").innerHTML = this.user.name

            if(!this.filesToUpload){
              //redireccion o lo que quieras si no hay contenido
            }else{
              this.makeFilerequest(this.url+'upload-image-user/'+this.user._id,[], this.filesToUpload).then(
                 (result: any) => {
                   this.user.image = result.image;
                   localStorage.setItem('identity', JSON.stringify(this.user));

                   console.log(this.user);

                }
              );
            }

            this.alertMessage = "El usuario se ha actualizado correctamente";
          }
        },
        error =>{
            var errorMessage = <any>error;
            if(errorMessage != null){
              //como parsear el error del json (el body)
              var body = JSON.parse(error._body);
              // hasta aqui
              this.alertMessage = body.message;
              console.log(error);
        }
      }
      );
    }

    public filesToUpload: Array<File>;

    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }

    makeFilerequest(url:string, params: Array<string>, files: Array<File>){
      console.log('sirpask1:' +url);
      console.log('sirpask2:' +params);
      console.log('sirpask3:' +files);

      var token = this.token;

      return new Promise(function(resolve, reject){
        var formData:any = new FormData();
        var xhr = new XMLHttpRequest();

        for(var i = 0; i < files.length; i++){
          formData.append('image', files[i], files[i].name);
        }
        xhr.onreadystatechange = function()  {
          if(xhr.readyState == 4){
            if(xhr.status == 200 ){
              resolve(JSON.parse(xhr.response));
            }else{
              reject(xhr.response);
            }
          }
        }
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Authorization',token);
        xhr.send(formData);
      });

    }

}
