import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';

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

  private reloadTrigger: BehaviorSubject<TicketsFilter|undefined>;

  constructor(private ticketsFacade: TicketsFacade) { 
    this.tickets$ = this.ticketsFacade.getTickets();
    this.allTicketsLoaded$ = this.ticketsFacade.allTicketsLoaded();
    this.isUpdating$ = this.ticketsFacade.isTicketsListUpdating();

    this.reloadTrigger = new BehaviorSubject<TicketsFilter|undefined>(undefined);
  }

  ngOnInit(): void {
    this.ticketsFacade.loadTickets().subscribe()

    this.reloadTrigger
        .pipe(switchMap(filter => this.ticketsFacade.loadTickets(filter)))
        .subscribe();
  }

  fetchMore(): void {
    this.ticketsFacade.fetchMoreTickets(this.reloadTrigger.value);
  }

  applyFilter(filter: TicketsFilter): void {
    this.reloadTrigger.next(filter);
  }
}
