import * as _moment from 'moment';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { ApplicationsFilter } from '../../models/applications-filter';
import { ApplicationsFilterOptions } from '../../models/applications-filter-options';
import { DATE_FORMATS } from 'src/app/shared/models/date-formats';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'applications-filter',
  templateUrl: './applications-filter.component.html',
  styleUrls: ['./applications-filter.component.scss'],
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
export class ApplicationsFilterComponent implements OnInit {
  @Input() options!: ApplicationsFilterOptions;
  @Output() applyfilter = new EventEmitter<ApplicationsFilter>();
  
  filterForm = this.fb.group({
    startDate: [null],
    endDate: [null],
    statuses: [[]]
  })

  private subscription?: Subscription;

  constructor(private fb: FormBuilder) { }

  get startDate() {
    return this.filterForm.get('startDate');
  }

  get endDate() {
    return this.filterForm.get('endDate');
  }

  get statuses() {
    return this.filterForm.get('statuses');
  }

  ngOnInit(): void {
    this.subscription = this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(() => this.applyfilter.emit(this.getFilter()));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getFilter(): ApplicationsFilter {
    return {
      startDate: this.startDate?.value ? _moment(this.startDate?.value).format('DD/MM/YYYY') : undefined,      
      endDate: this.endDate?.value ? _moment(this.endDate?.value).format('DD/MM/YYYY') : undefined, 
      statusIds: this.statuses?.value ?? []
    }
  }
}
