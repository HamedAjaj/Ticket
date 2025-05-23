import { Routes } from '@angular/router';

export  
const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./Pages/home/home.component').then(m => m.HomeComponent)
  }
];

 
