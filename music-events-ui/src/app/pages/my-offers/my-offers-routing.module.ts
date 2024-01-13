import { RouterModule, Routes } from "@angular/router";

import { MyOfferDetailsComponent } from "./components/my-offer-details/my-offer-details.component";
import { MyOffersPageComponent } from "./components/my-offers-page/my-offers-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: MyOffersPageComponent },
    { path: 'details/:id', component: MyOfferDetailsComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MyOffersRoutingModule { }