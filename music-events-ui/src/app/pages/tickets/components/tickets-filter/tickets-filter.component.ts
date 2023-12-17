import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

import { DATE_FORMATS } from 'src/app/shared/models/date-formats';
import { FormBuilder } from '@angular/forms';
import { SortOrder } from '../../models/sort-order';
import { TicketsFilter } from '../../models/tickets-filter';

@Component({
  selector: 'tickets-filter',
  templateUrl: './tickets-filter.component.html',
  styleUrls: ['./tickets-filter.component.scss'],
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
export class TicketsFilterComponent implements OnInit {
  @Output() applyfilter = new EventEmitter<TicketsFilter>();
  sortEnum = SortOrder;
  sortOrderKeys: (keyof typeof this.sortEnum)[];

  filterForm = this.fb.group({
    startDate: [null],
    endDate: [null],
    order: [["0"]]
  })

  private subscription?: Subscription;

  constructor(private fb: FormBuilder) { 
    this.sortOrderKeys = <(keyof typeof this.sortEnum)[]>Object.keys(this.sortEnum)
      .filter(val => !isNaN(Number(val)));
  }

  get startDate() {
    return this.filterForm.get('startDate');
  }

  get endDate() {
    return this.filterForm.get('endDate');
  }

  get order() {
    return this.filterForm.get('order');
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

  getFilter(): TicketsFilter {
    return {
      startDate: this.startDate?.value ?? undefined,      //sformatowac date tak zeby bylo dobrze xd
      endDate: this.endDate?.value ?? undefined,           //sformatowac date tak zeby bylo dobrze xd
      order: this.order?.value ? Number(this.order?.value[0]) : 0
    }
  }

}
