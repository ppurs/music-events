import { Component, OnInit } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';

import { Ticket } from '../../models/ticket';
import { TicketsFacade } from '../../services/tickets-facade/tickets.facade';
import { TicketsFilter } from '../../models/tickets-filter';

@Component({
  selector: 'tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrls: ['./tickets-page.component.scss']
})
export class TicketsPageComponent implements OnInit {
  tickets$: Observable<Ticket[]>;
  allTicketsLoaded$: Observable<boolean>;
  isUpdating$: Observable<boolean>;

  private reloadTrigger: Subject<TicketsFilter>;

  constructor(private ticketsFacade: TicketsFacade) { 
    this.tickets$ = this.ticketsFacade.getTickets();
    this.allTicketsLoaded$ = this.ticketsFacade.allTicketsLoaded();
    this.isUpdating$ = this.ticketsFacade.isTicketsListUpdating();

    this.reloadTrigger = new Subject<TicketsFilter>();
  }

  ngOnInit(): void {
    this.ticketsFacade.loadTickets().subscribe()

    this.reloadTrigger
        .pipe(switchMap(filter => this.ticketsFacade.loadTickets(filter)))
        .subscribe();
  }

  fetchMore(): void {
    this.ticketsFacade.fetchMoreTickets();
  }

  applyFilter(filter: TicketsFilter): void {
    this.reloadTrigger.next(filter);
  }
}
