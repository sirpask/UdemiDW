import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import inicial
import { HomeComponent } from './components/home.component';

//import user
import { UserEditComponent } from './components/user-edit.component';

//import artist
import { ArtistListComponent } from './components/artist-list.component';

//crear array app Router  los ** es la ruta por defecto
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'artists/:page', component: ArtistListComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: '**', component: HomeComponent}

];

export const  appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
