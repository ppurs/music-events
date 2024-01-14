import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio'
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketsFilterComponent } from './components/tickets-filter/tickets-filter.component';
import { TicketsListItemComponent } from './components/tickets-list-item/tickets-list-item.component';
import { TicketsPageComponent } from './components/tickets-page/tickets-page.component';
import { TicketsRoutingModule } from './tickets-routing.module';

@NgModule({
  declarations: [
    TicketsPageComponent,
    TicketsListItemComponent,
    TicketsFilterComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule,
    SharedModule,
    TicketsRoutingModule,
  ]
})
export class TicketsModule { }
