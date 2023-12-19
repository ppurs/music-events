import { RouterModule, Routes } from "@angular/router";

import { ApplicationsPageComponent } from "./components/applications-page/applications-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: ApplicationsPageComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ApplicationsRoutingModule { }