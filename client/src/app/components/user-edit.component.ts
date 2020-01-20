import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

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

    constructor( private _userService: UserService ){
        this.titulo = 'Actualizar mis datos';
        //this.user = new User('','','','','','ROLE_USER','');  // inicializamos el Usuario vacio

        // LocalStorage
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;

    }

    ngOnInit(){

        console.log('user.edit.component.ts cargado');
    }

    onSubmit(){
      console.log(this.user);

      this._userService.updateUser(this.user).subscribe(
        response => {
          this.user = response.user;
          if(!response.user){
            this.alertMessage = "El usuario no se ha actualizado";
          }else{
            this.user = response.user;
            localStorage.setItem('identity', JSON.stringify(this.user));
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

}
