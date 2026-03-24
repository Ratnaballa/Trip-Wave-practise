import { Routes } from '@angular/router';
import { Login }          from './login/login';
import { Home }           from './home/home';
import { Destinations }   from './destinations/destinations';
import { Explore }        from './explore/explore';
import { Packages }       from './packages/packages';
import { Wishlist }       from './wishlist/wishlist';
import { Booking }        from './bookings/bookings';
import { MyBookings }     from './my-bookings/my-bookings';
import { Payment }        from './payment/payment';
import { BookingSuccess } from './booking-success/booking-success';
import { Profile }        from './profile/profile';
import { Settings }       from './settings/settings';
import { Offers }         from './offers/offers';
import { Support }        from './support/support';
import { Contact }        from './contact/contact';
import { authGuard }      from './services/auth.guard';

export const routes: Routes = [
  { path: '',                redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',            component: Home },
  { path: 'destinations',    component: Destinations },
  { path: 'packages',        component: Packages },
  { path: 'explore/:id',     component: Explore },
  { path: 'wishlist',        component: Wishlist },
  { path: 'login',           component: Login },

  // ── Protected routes ──────────────────────────────────────────────────────
  { path: 'bookings/:id',    component: Booking,        canActivate: [authGuard] },
  { path: 'payment',         component: Payment,        canActivate: [authGuard] },
  { path: 'booking-success', component: BookingSuccess, canActivate: [authGuard] },
  { path: 'my-bookings',     component: MyBookings,     canActivate: [authGuard] },
  { path: 'profile',         component: Profile,        canActivate: [authGuard] },
  { path: 'settings',        component: Settings,       canActivate: [authGuard] },
  { path: 'offers',          component: Offers,         canActivate: [authGuard] },

  // ── Public support pages ──────────────────────────────────────────────────
  { path: 'support',         component: Support },
  { path: 'contact',         component: Contact },
];
