import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DATE_FORMATS } from 'src/app/shared/models/date-formats';
import { FormBuilder } from '@angular/forms';
import { MusicEventsFilter } from '../../models/music-events-filter';
import { MusicEventsFilterOptions } from '../../models/music-events-filter-options';
import { switchMap } from 'rxjs';


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
    cities: [<string[]><unknown>undefined],
    startDate: [null],
    endDate: [null],
    types: [<string[]><unknown>undefined],
    genres: [<string[]><unknown>undefined]
  });

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

  constructor(private fb: FormBuilder) { }

  //switchMap użyć!
  ngOnInit(): void {
    //obczaic co zrobic z podwojna data xd
    this.filterForm.valueChanges.pipe(switchMap(val => new Promise(resolve => resolve(val)))).do().subscribe();
  }

  getFormValue(): MusicEventsFilter {
    return {
      cities: this.cities?.value ?? [],
      startDate: this.startDate?.value ?? undefined,
      endDate: this.endDate?.value ?? undefined,
      types: this.types?.value ?? [],
      genres: this.genres?.value ?? []
    };
  }

}
