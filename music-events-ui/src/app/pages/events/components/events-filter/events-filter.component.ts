import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';

import { DATE_FORMATS } from 'src/app/shared/models/date-formats';
import { FormBuilder } from '@angular/forms';
import { MusicEventsFilter } from '../../models/music-events-filter';
import { MusicEventsFilterOptions } from '../../models/music-events-filter-options';
import { Subscription, debounceTime, distinctUntilChanged, merge, of } from 'rxjs';

@Component({
  selector: 'events-filter',
  templateUrl: './events-filter.component.html',
  styleUrls: ['./events-filter.component.scss'],
  providers: [{
    provide: MAT_DATE_FORMATS,
    useValue: DATE_FORMATS,
  },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },],
})
export class EventsFilterComponent implements OnInit {
  @Input() options!: MusicEventsFilterOptions;
  @Output() applyfilter = new EventEmitter<MusicEventsFilter>();

  filterForm = this.fb.group({
    search: [''],
    cities: [<string[]><unknown>undefined],
    startDate:[null],
    endDate:[null],
    types: [<string[]><unknown>undefined],
    genres: [<string[]><unknown>undefined]
  });

  get search() {
    return this.filterForm.get('search');
  }

  get cities() {
    return this.filterForm.get('cities');
  }

  get startDate() {
    return this.filterForm.get('startDate');
  }

  get endDate() {
    return this.filterForm.get('endDate');
  }

  get types() {
    return this.filterForm.get('types');
  }

  get genres() {
    return this.filterForm.get('genres');
  }

  private subscription?: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //obczaic co zrobic z podwojna data 
    const mergedFields = merge( this.cities?.valueChanges ?? of(null), 
                          this.types?.valueChanges ?? of(null), 
                          this.genres?.valueChanges ?? of(null), 
                          this.startDate?.valueChanges ?? of(null),
                          this.endDate?.valueChanges ?? of(null))
    
    this.subscription = mergedFields
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
        )
        .subscribe(() => this.applyfilter.emit(this.getFilter()));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getFilter(): MusicEventsFilter {
    return {
      search: this.search?.value ?? undefined,
      cities: this.cities?.value ?? [],
      startDate: this.startDate?.value ? _moment(this.startDate?.value).format('YYYY-MM-DD') : undefined,      
      endDate: this.endDate?.value ? _moment(this.endDate?.value).format('YYYY-MM-DD') : undefined,           
      types: this.types?.value ?? [],
      genres: this.genres?.value ?? []
    }
  }

  applySearch():void {
    this.applyfilter.emit(this.getFilter())
  }

}
