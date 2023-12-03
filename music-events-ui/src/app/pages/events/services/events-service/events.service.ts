import * as _moment from 'moment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicEvent } from '../../models/music-event';
import { MusicEventsFilter } from '../../models/music-events-filter';
import { MusicEventsFilterOptions } from '../../models/music-events-filter-options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly EVENTS_API = "/api/events";

  constructor(private http: HttpClient) { }

  getEvents( filter?: MusicEventsFilter, offset: number=0 ): Observable<MusicEvent[]> {
    return this.http.post<MusicEvent[]>(
      this.EVENTS_API + '/list', 
      { filter: filter,
        offset: offset 
      }
    );   
  }

  getFilterOptions(): Observable<MusicEventsFilterOptions> {
    return this.http.get<MusicEventsFilterOptions>(this.EVENTS_API + '/filters');
  }
}
