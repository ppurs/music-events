import { Observable, shareReplay, tap } from 'rxjs';

import { EventsService } from '../events-service/events.service';
import { EventsState } from '../events-state/events.state';
import { Injectable } from '@angular/core';
import { MusicEvent } from '../../models/music-event';
import { MusicEventsFilter } from '../../models/music-events-filter';
import { MusicEventsFilterOptions } from '../../models/music-events-filter-options';

@Injectable({
  providedIn: 'root'
})
export class EventsFacade {
  private filterOptions$: Observable<MusicEventsFilterOptions>

  constructor(private eventsService: EventsService,
              private eventsState: EventsState) {
    this.filterOptions$ = this.eventsService.getFilterOptions()
                                            .pipe(shareReplay(1))
  }

  getEvents(): Observable<MusicEvent[]> {
    return this.eventsState.getEvents$();
  }

  getFilterOptions() {
    return this.filterOptions$;
  }

  loadEvents(filter?: MusicEventsFilter) {
    return this.eventsService.getEvents(filter)
              .pipe(tap(events => this.eventsState.setEvents(events)));
  }      

  fetchMoreEvents(filter?: MusicEventsFilter) {
    this.eventsState.allEventsLoaded$().subscribe({
      next: res => {
        if(!res) {
          this.eventsService.getEvents(filter, this.eventsState.getOffset()).subscribe({
            next: results => this.eventsState.addEvents(results),
            error: error => console.log(error),
            complete: () => this.eventsState.setUpdating(false)
          })
        }
      }
    })
  }
  
}
