import * as _moment from 'moment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SortOrder } from 'src/app/shared/models/sort-order';
import { Ticket } from '../../models/ticket';
import { TicketsFilter } from '../../models/tickets-filter';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  private readonly TICKETS_API = '/api/tickets'

  constructor(private http: HttpClient) { }

  getTickets(listOrder: SortOrder, filter?: TicketsFilter, offset: number=0 ): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(
      this.TICKETS_API + '/list', 
      { 
        filter: {
          startDate: filter?.startDate,
          endDate: filter?.endDate
        },
        offset: offset,
        listOrder: listOrder
      }
    );   
  }
}
