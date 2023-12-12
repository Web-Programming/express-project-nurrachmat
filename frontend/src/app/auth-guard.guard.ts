import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isLoggedIn() 
  ? true 
  : inject(Router).createUrlTree(['/login']);
};
