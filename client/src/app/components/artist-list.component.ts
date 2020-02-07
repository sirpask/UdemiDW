import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { Artist } from '../models/artist';

@Component({
  selector: 'artist-list',
  templateUrl: '../views/artist-list.html',
  providers: [UserService]
})

export class ArtistListComponent implements OnInit{
  public titulo: string;
  public artists: Artist[];
  public identity;
  public token;
  public url: string;

  constructor(
    //propiedades, para navegar,
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
  ){
    this.titulo = 'Artistas';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('artist-list.component.ts cargado')

    //Conseguir el listado de artistas
  }

}
