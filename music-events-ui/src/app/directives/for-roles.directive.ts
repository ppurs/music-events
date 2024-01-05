import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../core/auth/services/auth.service';
import { Role } from '../core/auth/models/role';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[forRoles]'
})
export class ForRolesDirective implements OnInit {

  roles: Role[];
  loginSubscription?: Subscription;

  @Input()
  set forRoles( inRoles: Role[] | Role ) {
    if (inRoles != null) {
      this.roles = Array.isArray(inRoles) ? inRoles : [inRoles];
    } 
    else {
      this.roles = [];
    }
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) {
    this.roles = []
  }

  ngOnInit(): void {
    this.loginSubscription = this.authService.isLoggedIn$.subscribe( () => {
      this.authService.getUserRoles$().subscribe(
        userRoles => {
          if (userRoles && !this.roles.some(val => userRoles.includes(val) )) {
            this.viewContainer.clear();
          } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        }
      );
    })
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe()
  }

}