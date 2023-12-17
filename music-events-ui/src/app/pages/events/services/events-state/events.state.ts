import { BehaviorSubject, Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { MusicEvent } from '../../models/music-event';

@Injectable({
  providedIn: 'root'
})
export class EventsState{
  private events$ = new BehaviorSubject<MusicEvent[]>([]);
  private updating$ = new BehaviorSubject<boolean>(false);
  private allLoaded$ = new BehaviorSubject<boolean>(false);
  private readonly LIMIT = 5;

  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getEvents$(): Observable<MusicEvent[]> {
    return this.events$.asObservable();
  }

  getEvent(id: number): Observable<MusicEvent> {
    const event = this.events$.value.find(e => e.id === id)!;

    return of(event);
  }

  setEvents(events: MusicEvent[]) {
    this.allLoaded$.next(events.length < this.LIMIT ? true : false);
    this.events$.next(events);
  }

  allEventsLoaded$(): Observable<boolean> {
    return this.allLoaded$.asObservable();
  }

  getOffset(): number {
    return this.events$.getValue().length;
  }

  addEvents(events: MusicEvent[]) {
    this.allLoaded$.next(events.length < this.LIMIT ? true : false)

    const currentValue = this.events$.getValue();
    this.events$.next([...currentValue, ...events]);
  }
}
