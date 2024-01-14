import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./helpers/auth-guard/auth-guard.service";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: 'login', component: LoginFormComponent,
      canActivate: [AuthGuard]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule { }