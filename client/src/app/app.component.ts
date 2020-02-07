import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';
//importamos nuestro servicio de user.service.ts
import { UserService } from './services/user.service';
import { faFilm,
         faAdjust,
         faSearchPlus,
         faPlusCircle,
         faArrowsAlt
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'] NO SE USA
  providers: [UserService],
  //selector: 'app-fontawesome',
  //templateUrl: './fontawesome.component.html',
  //styleUrls: ['./fontawesome.component.scss']
})
export class AppComponent  implements OnInit{
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  //local storage
  public identity; //= true;
  public token;
  public errorMessage;
  public alertRegister;
  faFilm = faFilm;
  faAdjust = faAdjust;
  faSearchPlus = faSearchPlus;
  faPlusCircle = faPlusCircle;
  faArrowsAlt = faArrowsAlt;
  public url:string;

  constructor(
    private _userService:UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ){

      this.user = new User('','','','','','ROLE_USER','');  // inicializamos el Usuario vacio
      this.user_register = new User('','','','','','ROLE_USER','');  // las variables del usurio, las de la derecha
      this.url = GLOBAL.url;
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
                //  this.user = new User('','','','','','ROLE_USER','');  // inicializamos el Usuario vacio


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

                          }



                      },
                      error => {
                          console.log('pask8');
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
      this.user = new User('','','','','','ROLE_USER','');  // inicializamos el Usuario vacio
      this.identity = null;
      this.token = null;
      this._router.navigate(['/']);
  }


  onSubmitRegister(){
      console.log(this.user_register);

      this._userService.register(this.user_register).subscribe(
          response => {
              let user = response.user;
              this.user_register = user;

             // console.log('joer' + user.id);
              if(!user._id){
                  this.alertRegister = 'Error al registrarse';
              }else{
                  this.alertRegister = 'El registro se ha realizado correctamente, identificate con' + this.user_register.email;
                  this.user_register = new User('','','','','','ROLE_USER','');
              }
          },
          error =>{
              var errorMessage = <any>error;
              if(errorMessage != null){
                  //como parsear el error del json (el body)
                  var body = JSON.parse(error._body);
                  // hasta aqui
                  this.alertRegister = body.message;
                  console.log(error);
          }
      }

      )
  }
}
