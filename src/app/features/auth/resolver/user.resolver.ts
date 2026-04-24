import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { AuthService, AuthUser } from '../services/auth.service';
import { inject } from '@angular/core';
export const userResolver: ResolveFn<AuthUser> = (route: ActivatedRouteSnapshot) => {
  
const userService = inject(AuthService);
  const id = route.paramMap.get('id')!;
   return userService.getUserById(id);
};
