import { Observable, first, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { SortOrder } from 'src/app/shared/models/sort-order';
import { Ticket } from '../../models/ticket';
import { TicketsFilter } from '../../models/tickets-filter';
import { TicketsService } from '../tickets-service/tickets.service';
import { TicketsState } from '../tickets-state/tickets.state';

@Injectable({
  providedIn: 'root'
})
export class TicketsFacade {
  private readonly DEFAULT_LIST_ORDER: SortOrder = {order: 0, field: "event_date"};

  constructor(private ticketsService: TicketsService,
              private ticketsState: TicketsState) { }

  getTickets(): Observable<Ticket[]> {
    return this.ticketsState.getTickets$();
  }
            
  loadTickets(filter?: TicketsFilter) {  
    this.ticketsState.setUpdating(true);
            
    return this.ticketsService.getTickets(filter?.order ?? this.DEFAULT_LIST_ORDER, filter)
              .pipe(tap(tickets => {
                this.ticketsState.setTickets(tickets);
                this.ticketsState.setUpdating(false);
              }
            ));
  }    
              
  isTicketsListUpdating(): Observable<boolean> {
    return this.ticketsState.isUpdating$();
  }
            
  allTicketsLoaded(): Observable<boolean> {
    return this.ticketsState.allTicketsLoaded$()
  }
            
  fetchMoreTickets(filter?: TicketsFilter) {
    this.ticketsState.allTicketsLoaded$().pipe(first()).subscribe({
      next: res => {
        if(!res) {
          this.ticketsService.getTickets(filter?.order ?? this.DEFAULT_LIST_ORDER, filter, this.ticketsState.getOffset()).subscribe({
            next: results => this.ticketsState.addTickets(results),
            error: error => console.log(error),
            complete: () => this.ticketsState.setUpdating(false)
          })
        }
      }
    })
  }
}
