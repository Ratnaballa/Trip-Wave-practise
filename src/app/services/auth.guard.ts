import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  if (auth.isLoggedIn()) return true;
  const returnUrl = '/' + route.url.map(s => s.path).join('/');
  console.warn('[AuthGuard] Not logged in — redirecting to /login, returnUrl:', returnUrl);
  return router.createUrlTree(['/login'], { queryParams: { returnUrl } });
};
