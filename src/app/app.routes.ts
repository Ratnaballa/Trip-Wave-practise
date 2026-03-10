import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Destinations } from './destinations/destinations';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'destinations', component: Destinations },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];