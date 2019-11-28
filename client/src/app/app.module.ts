import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [               //cargamos componentes y directivas
    AppComponent
  ],
  imports: [                        //cargamos modulos del framework y modulos nuestros
    BrowserModule,
    //AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [],    // cargamos servicios
  bootstrap: [AppComponent]     //endpoint o punto principal de carga de la app
})
export class AppModule { }
