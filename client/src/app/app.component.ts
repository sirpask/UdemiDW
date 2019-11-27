import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'] NO SE USA
})
export class AppComponent {
  public title = 'MUSIFY';
  public user: User;
  //local storage
  public identity //= true;
  public token;

  constructor(){
      this.user = new User('','','','','','ROLE_USER','');  // inicializamos el Usuario vacio


  }
}
