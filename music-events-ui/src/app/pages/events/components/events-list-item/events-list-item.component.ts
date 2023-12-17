import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly BOOK_TICKET_PATH = 'book'

  constructor(public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  openDetails(): void {
    const dialogRef = this.dialog.open(EventDetailsDialogComponent, {
      data: this.event,
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe( (res: number) => {
      if (res) {
        this.onBookTicket(res)
      }
    });
  }

  onBookTicket(id: number): void {
    this.router.navigate([this.BOOK_TICKET_PATH, id], {relativeTo: this.route});
  }
}
