import { RouterModule, Routes } from "@angular/router";

import { EventsPageComponent } from "./components/events-page/events-page.component";
import { NgModule } from "@angular/core";
import { TicketPurchaseComponent } from "./components/ticket-purchase/ticket-purchase.component";

const routes: Routes = [
    { path: '', component: EventsPageComponent },
    { path: 'book/:id', component: TicketPurchaseComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EventsRoutingModule { }