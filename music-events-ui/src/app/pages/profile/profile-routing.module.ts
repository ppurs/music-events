import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { ProfilePageComponent } from "./components/profile-page/profile-page.component";

const routes: Routes = [
    { path: '', component: ProfilePageComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProfileRoutingModule { }