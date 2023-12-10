import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OffersFilterOptions } from '../../models/offers-filter-options';
import { OffersFilter } from '../../models/offers-filter';
import { Subscription, debounceTime, distinctUntilChanged, merge, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DATE_FORMATS } from 'src/app/shared/models/date-formats';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'offers-filter',
  templateUrl: './offers-filter.component.html',
  styleUrls: ['./offers-filter.component.scss'],
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
export class OffersFilterComponent implements OnInit {
  @Input() options!: OffersFilterOptions;
  @Output() applyfilter = new EventEmitter<OffersFilter>();

  filterForm = this.fb.group({
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
    //obczaic co zrobic z podwojna data xd
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

  getFilter(): OffersFilter {
    return {
      cities: this.cities?.value ?? [],
      startDate: this.startDate?.value ?? undefined,      //sformatowac date tak zeby bylo dobrze xd
      endDate: this.endDate?.value ?? undefined,           //sformatowac date tak zeby bylo dobrze xd
      types: this.types?.value ?? [],
      genres: this.genres?.value ?? []
    }
  }

  applySearch():void {
    this.applyfilter.emit(this.getFilter())
  }

}
