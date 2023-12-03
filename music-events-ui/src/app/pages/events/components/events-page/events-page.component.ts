import { Component, OnInit } from '@angular/core';
import { Observable, Subject, forkJoin, switchMap } from 'rxjs';

import { EventsFacade } from '../../services/events-facade/events.facade';
import { MusicEvent } from '../../models/music-event';
import { MusicEventsFilter } from '../../models/music-events-filter';
import { MusicEventsFilterOptions } from '../../models/music-events-filter-options';

@Component({
  selector: 'events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  
  events$: Observable<MusicEvent[]>;
  filterOptions: MusicEventsFilterOptions;

  private reloadTrigger: Subject<MusicEventsFilter>;

  constructor(private eventsFacade: EventsFacade) { 
    this.events$ = this.eventsFacade.getEvents();
    this.filterOptions = {cities: [], types: [], genres: []}

    this.reloadTrigger = new Subject<MusicEventsFilter>();
  }

  ngOnInit(): void {
    forkJoin([
      this.eventsFacade.getFilterOptions(),
      this.eventsFacade.loadEvents()
    ]).subscribe(([options, events]) => this.filterOptions = options)

    this.reloadTrigger
        .pipe(switchMap(filter => this.eventsFacade.loadEvents(filter)))
        .subscribe();
  }

  fetchMore(): void {
    this.eventsFacade.fetchMoreEvents();
  }

  applyFilter(event: MusicEventsFilter): void {
    console.log(event);
    this.reloadTrigger.next(event);
  }
}
