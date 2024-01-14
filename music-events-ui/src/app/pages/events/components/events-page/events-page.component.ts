import { BehaviorSubject, Observable, forkJoin, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';

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
  allEventsLoaded$: Observable<boolean>;
  isUpdating$: Observable<boolean>;

  private reloadTrigger: BehaviorSubject<MusicEventsFilter|undefined>;

  constructor(private eventsFacade: EventsFacade) { 
    this.events$ = this.eventsFacade.getEvents();
    this.filterOptions = {cities: [], types: [], genres: []}
    this.allEventsLoaded$ = this.eventsFacade.allEventsLoaded();
    this.isUpdating$ = this.eventsFacade.isEventsListUpdating();

    this.reloadTrigger = new BehaviorSubject<MusicEventsFilter|undefined>(undefined);
  }

  ngOnInit(): void {
    forkJoin([
      this.eventsFacade.getFilterOptions(),
      //this.eventsFacade.loadEvents()
    ]).subscribe(([options]) => this.filterOptions = options)

    this.reloadTrigger
        .pipe(switchMap(filter => this.eventsFacade.loadEvents(filter)))
        .subscribe();
  }

  fetchMore(): void {
    this.eventsFacade.fetchMoreEvents(this.reloadTrigger.value);
  }

  applyFilter(filter: MusicEventsFilter): void {
    this.reloadTrigger.next(filter);
  }
}
