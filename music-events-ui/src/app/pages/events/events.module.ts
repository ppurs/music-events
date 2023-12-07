import { CommonModule } from '@angular/common';
import { EventsFilterComponent } from './components/events-filter/events-filter.component';
import { EventsListItemComponent } from './components/events-list-item/events-list-item.component';
import { EventsPageComponent } from './components/events-page/events-page.component';
import { EventsRoutingModule } from './events-routing.module';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventDetailsDialogComponent } from './components/event-details-dialog/event-details-dialog.component';

@NgModule({
  declarations: [
    EventsPageComponent,
    EventsFilterComponent,
    EventsListItemComponent,
    EventDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule
  ]
})
export class EventsModule { }
