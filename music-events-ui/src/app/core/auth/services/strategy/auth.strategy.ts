import { HttpClient } from "@angular/common/http";
import { InjectionToken } from "@angular/core";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { Observable } from "rxjs";
import { Role } from "../../models/role";
import { environment } from "src/environments/environment";

export interface AuthStrategy {
    doLoginUser(data: any): void;
    doLogoutUser(): void;
    isUserLoggedIn():Observable<boolean>;
    getUserRoles(): Observable<Role[]>;
  }
  
export const AUTH_STRATEGY = new InjectionToken<AuthStrategy>('AuthStrategy');
  
export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient],
  useFactory: () => {
     switch (environment.auth) {
        case 'token':
          return new JwtAuthStrategy();
        default: throw Error("[ERROR]: No configuration for auth found.");
       }
  }
};