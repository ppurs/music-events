import * as _moment from 'moment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../../models/ticket';
import { TicketsFilter } from '../../models/tickets-filter';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private readonly TICKETS_API = '/tickets'

  constructor(private http: HttpClient) { }

  getTickets( filter?: TicketsFilter, offset: number=0 ): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(
      this.TICKETS_API + '/list', 
      { 
        filter: filter,
        offset: offset 
      }
    );   
  }
}
