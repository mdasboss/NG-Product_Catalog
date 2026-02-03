import { Injectable, inject } from '@angular/core';
import { CanActivate, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean | UrlTree {
     if(this.auth.token) return true;
     this.router.navigate(['/auth/login']);
     return false
  }

  
 canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.auth.token) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

}