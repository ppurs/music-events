import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { OffersPageComponent } from "./components/offers-page/offers-page.component";

const routes: Routes = [
    { path: '', component: OffersPageComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OffersRoutingModule { }