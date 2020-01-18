import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


//import user
import { UserEditComponent } from './components/user-edit.component';

//crear array app Router
const appRoutes: Routes = [
  {path: '', component: UserEditComponent},
  {path: 'mis-datos', component: UserEditComponent},
  {path: '**', component: UserEditComponent}
  
];

export const  appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
