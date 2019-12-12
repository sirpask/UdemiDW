import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
//importamos nuestro servicio de user.service.ts
import { userService } from './services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'] NO SE USA
  providers: [userService]
})
export class AppComponent  implements OnInit{
  public title = 'MUSIFY';
  public user: User;
  //local storage
  public identity; //= true;
  public token;
  public errorMessage;

  constructor(private _userService:userService){

      this.user = new User('','','','','','ROLE_USER','');  // inicializamos el Usuario vacio


  }

  //para llamar al servicio
    ngOnInit(){
    //esta prueba ya la podemos quitar de aqui
            //var texto = this._userService.signup();
            //console.log(texto);
            this.identity = this._userService.getIdentity();
            this.token = this._userService.getToken();

            console.log(this.identity);
            console.log(this.token);


    }



  public onSubmit() {
      console.log(this.user);

      //conseguimos los datos de usuario
      this._userService.signup(this.user).subscribe(
          response => {
              console.log(response);
              let identity = response.user;
              this.identity = identity;

              if(!this.identity._id){
                  alert("El usuario no está correctamente identificado")
              }else{
                  //crear sesion en el local storaje para tener al usuario en sesion
                  //para guardar la sesion, grabando en el localStorage
                  localStorage.setItem('identity', JSON.stringify(identity));


                  //conseguir el token para enviarselo a cada peticion Http
                  this._userService.signup(this.user, 'true').subscribe(
                      response => {
                          let token = response.token;
                          this.token = token;

                          if(this.token.length <= 0){
                              alert("EL token no se ha generado correctamente")
                          }else{
                              //crear sesion en el local storaje para tener al usuario en sesion para tener el token disponible
                              localStorage.setItem('token', token);


                              console.log(token);
                              console.log(identity);
                          }



                      },
                      error => {
                          var errorMessage = <any>error;
                          if(errorMessage != null){
                              //como parsear el error del json (el body)
                              var body = JSON.parse(error._body);
                              // hasta aqui
                              this.errorMessage = body.message;
                              console.log(error);
                          }
                      }
                  );


              }



          },
          error => {
              var errorMessage = <any>error;
              if(errorMessage != null){
                  //como parsear el error del json (el body)
                  var body = JSON.parse(error._body);
                  // hasta aqui
                  this.errorMessage = body.message;
                  console.log(error);
              }
          }
      );

  }

  logout(){
      localStorage.removeItem('identity');
      localStorage.removeItem('token');
      localStorage.clear();
      this.identity = null;
      this.token = null;
  }


}
