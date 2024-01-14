import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { AUTH_STRATEGY, AuthStrategy } from './strategy/auth.strategy';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { LoginResponse } from '../models/login-response';
import { RequestResponse } from '../models/request-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_API = "/api/auth";

  public readonly LOGIN_PATH = '/login';
  public readonly HOME_PATH = '/events';
  public readonly INITIAL_PATH = '/profile';

  private isLoggedIn!: BehaviorSubject<boolean> 
  public isLoggedIn$: Observable<boolean>

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(AUTH_STRATEGY) private auth: AuthStrategy) {
    this.auth.isUserLoggedIn()
                .pipe(catchError(() => of(false)))
                .subscribe(res => this.isLoggedIn = new BehaviorSubject<boolean>(res))
    this.isLoggedIn$ = this.isLoggedIn.asObservable()
  }

  getUserRoles$(): Observable<Role[]> {
    return this.auth.getUserRoles();
  }

  login( email: string, password: string ): Observable<RequestResponse> {
    return this.http.post<LoginResponse>(
      this.AUTH_API + '/login',
      {
        email,
        password,
      }
    ).pipe(
      map( (data) => {
        if (data.result) {
          this.auth.doLoginUser(data);
          this.updateLoginState();
        }
        return data;
       })
    );
  }

  logout() {
      this.auth.doLogoutUser();
      this.updateLoginState();

      //TODO: don't redirect if it's not necessary
      this.router.navigate([this.HOME_PATH]);
  }

  private updateLoginState(): void {
    this.auth.isUserLoggedIn().pipe(catchError(() => of(false)))
      .subscribe(res => this.isLoggedIn.next(res))
  }
}
