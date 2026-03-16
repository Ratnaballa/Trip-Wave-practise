import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Destinations } from './destinations/destinations';
import { Explore } from './explore/explore';
import { Settings } from './settings/settings';
import { Notifications } from './notifications/notifications';
import { Reports } from './reports/reports';
import { Support } from './support/support';
import { Signin } from './signin/signin';
export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'destinations', component: Destinations },
  { path: 'explore/:id', component: Explore },
  { path: 'settings', component: Settings },
  { path: 'notifications', component: Notifications },
  { path: 'reports', component: Reports },
  { path: 'support', component: Support },
  { path: 'signin', component: Signin },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];