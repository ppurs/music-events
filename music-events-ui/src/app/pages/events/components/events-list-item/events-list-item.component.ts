import { Component, Input, OnInit } from '@angular/core';

import { EventDetailsDialogComponent } from '../event-details-dialog/event-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MusicEvent } from '../../models/music-event';

@Component({
  selector: 'events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.scss']
})
export class EventsListItemComponent implements OnInit {
  @Input() event!: MusicEvent;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDetails(): void {
    const dialogRef = this.dialog.open(EventDetailsDialogComponent, {
      data: this.event,
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(() => {
      this.onBuyTicket()
    });
  }

  onBuyTicket(): void {
    //TODO: redirect to payment
  }
}
