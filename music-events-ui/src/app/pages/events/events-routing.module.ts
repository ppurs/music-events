import { RouterModule, Routes } from "@angular/router";

import { EventsPageComponent } from "./components/events-page/events-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', component: EventsPageComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EventsRoutingModule { }