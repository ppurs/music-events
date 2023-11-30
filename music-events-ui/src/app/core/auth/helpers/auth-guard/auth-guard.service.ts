import { CanActivate, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      tap(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate([this.authService.INITIAL_PATH]);
        }
      }),
      map(isLoggedIn => !isLoggedIn)
    );
  }
}
