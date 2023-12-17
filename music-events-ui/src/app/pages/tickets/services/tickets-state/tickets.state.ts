import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsState {
  private tickets$ = new BehaviorSubject<Ticket[]>([]);
  private updating$ = new BehaviorSubject<boolean>(false);
  private allLoaded$ = new BehaviorSubject<boolean>(false);
  private readonly LIMIT = 5;
  
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getTickets$(): Observable<Ticket[]> {
    return this.tickets$.asObservable();
  }

  setTickets(tickets: Ticket[]) {
    this.allLoaded$.next(tickets.length < this.LIMIT ? true : false);
    this.tickets$.next(tickets);
  }

  allTicketsLoaded$(): Observable<boolean> {
    return this.allLoaded$.asObservable();
  }

  getOffset(): number {
    return this.tickets$.getValue().length;
  }

  addTickets(tickets: Ticket[]) {
    this.allLoaded$.next(tickets.length < this.LIMIT ? true : false)

    const currentValue = this.tickets$.getValue();
    this.tickets$.next([...currentValue, ...tickets]);
  }
}
