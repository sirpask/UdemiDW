import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'home',
  templateUrl: '../views/home.html'
})

export class HomeComponent implements OnInit{
  public titulo: string;


  constructor(
    //propiedades, para navegar,
      private _route: ActivatedRoute,
      private _router: Router
  ){
    this.titulo = 'Artistas';

  }

  ngOnInit(){
    console.log('home.component.ts cargado')

    //Conseguir el listado de artistas
  }

}
