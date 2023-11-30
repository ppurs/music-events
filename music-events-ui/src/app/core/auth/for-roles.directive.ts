import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from './services/auth.service';
import { Role } from './models/role';

@Directive({
  selector: '[forRoles]'
})
export class ForRolesDirective {

  roles: Role[];

  @Input()
  set forRoles( inRoles: Role[] | Role ) {
    if (inRoles != null) {
      this.roles = Array.isArray(inRoles) ? inRoles : [inRoles];
    } 
    else {
      this.roles = [];
    }

    this.authService.getUserRoles$().subscribe(
      userRoles => {
        if (userRoles && !this.roles.some(val => userRoles.includes(val) )) {
          this.viewContainer.clear();
        } else {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    );
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) {
    this.roles = []
  }

}