import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./services/auth.service";
import { AUTH_STRATEGY } from "./services/strategy/auth.strategy";
import { JwtAuthStrategy } from "./services/strategy/jwt-auth.strategy";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, 
              @Inject(AUTH_STRATEGY) private jwt: JwtAuthStrategy) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (environment.auth === 'token' && this.jwt && this.jwt.getToken() ) {
      request = this.addToken(request, this.jwt.getToken().jwt);      
    }

    return next.handle(request).pipe(catchError(error => {
      if ([401, 403].indexOf(error.status) !== -1) {
        this.authService.logout();
      }
      return throwError(() => error);
    }));

  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });
  }

}