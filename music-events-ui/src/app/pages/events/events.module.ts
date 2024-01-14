import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { EventDetailsDialogComponent } from './components/event-details-dialog/event-details-dialog.component';
import { EventsFilterComponent } from './components/events-filter/events-filter.component';
import { EventsListItemComponent } from './components/events-list-item/events-list-item.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventsRoutingModule } from './events-routing.module';
import { MatStepperModule } from '@angular/material/stepper'
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TicketPurchaseComponent } from './components/ticket-purchase/ticket-purchase.component';

@NgModule({
  declarations: [
    EventsPageComponent,
    EventsFilterComponent,
    EventsListItemComponent,
    EventDetailsDialogComponent,
    TicketPurchaseComponent,
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MatStepperModule,
    SharedModule
  ]
})
export class EventsModule { }
