import { Observable, of } from "rxjs";
import { Role } from "../../models/role";
import { AuthStrategy } from "./auth.strategy";
import { Token } from "../../models/token";
import { LoginResponse } from "../../models/login-response";

export class JwtAuthStrategy implements AuthStrategy {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly ROLES = 'ROLES';
  
    doLoginUser( data: LoginResponse ): any {
        localStorage.setItem(this.ROLES, JSON.stringify(data.roles ?? []));
        localStorage.setItem(this.JWT_TOKEN, JSON.stringify(data.token));
    }
  
    doLogoutUser(): void {
      localStorage.removeItem(this.ROLES);
      localStorage.removeItem(this.JWT_TOKEN);
    }

    isUserLoggedIn(): Observable<boolean> {
      return of(this.getToken() != null);
    }

    getUserRoles(): Observable<Role[]> {
      const token = this.getToken();
      const roles = this.getStoredRoles();
      
      if (token) {
        return of(roles);
      }
      
      return of([]);
    }

    getToken(): Token { 
      return localStorage.getItem(this.JWT_TOKEN) != null ? 
                JSON.parse(<string>localStorage.getItem(this.JWT_TOKEN)) : null;
    }

    private getStoredRoles(): Role[] {
      return localStorage.getItem(this.ROLES) != null ? 
                JSON.parse(<string>localStorage.getItem(this.ROLES)) : [];
    }
  }