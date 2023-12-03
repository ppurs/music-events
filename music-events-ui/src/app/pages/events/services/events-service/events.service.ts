import * as _moment from 'moment';

import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicEvent } from '../../models/music-event';
import { MusicEventsFilter } from '../../models/music-events-filter';
import { MusicEventsFilterOptions } from '../../models/music-events-filter-options';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly EVENTS_API = "/api/events";

  constructor(private http: HttpClient) { }

  getEvents( filter?: MusicEventsFilter, offset: number=0 ): Observable<MusicEvent[]> {
    // return this.http.post<MusicEvent[]>(
    //   this.EVENTS_API + '/list', 
    //   { filter: filter,
    //     offset: offset 
    //   }
    // );

    const event: MusicEvent = {
      id: 1,
      title: "SafeTour",
      performer: "Gibbs",
      city: "Kraków",
      date: _moment("08-12-2023 18:00", 'DD-MM-YYYY hh:mm').toDate(),
      place: "Klub studio",
      type: "koncert",
      genre: "rap",  //???,
      price: 130.99
    }

    return of([event, event])
  }

  getFilterOptions(): Observable<MusicEventsFilterOptions> {
    //return this.http.get<MusicEventsFilterOptions>(this.EVENTS_API + '/filters');

    return of( {cities: ['Krakow', 'Warszawa', 'Poznan'], types: ['koncert', 'festiwal'], genres: ['rap', 'jazz', 'pop']})
  }
}
