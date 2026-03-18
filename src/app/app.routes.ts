import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Destinations } from './destinations/destinations';
import { Explore } from './explore/explore';
import { Packages } from './packages/packages';
import { Wishlist } from './wishlist/wishlist';
import { Settings } from './settings/settings';
import { Notifications } from './notifications/notifications';
import { Reports } from './reports/reports';
import { Support } from './support/support';
import { Signin } from './signin/signin';
import { Booking } from './bookings/bookings';
import { MyBookings } from './my-bookings/my-bookings';
export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'destinations', component: Destinations },
  { path: 'packages', component: Packages },
  { path: 'explore/:id', component: Explore },
  { path: 'wishlist', component: Wishlist },
  { path: 'bookings/:id', component: Booking },
  { path: 'my-bookings', component: MyBookings },
  { path: 'settings', component: Settings },
  { path: 'notifications', component: Notifications },
  { path: 'reports', component: Reports },
  { path: 'support', component: Support },
  { path: 'signin', component: Signin },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];