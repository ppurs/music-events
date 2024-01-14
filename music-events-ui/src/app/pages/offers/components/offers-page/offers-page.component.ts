import { BehaviorSubject, Observable, forkJoin, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Offer } from '../../models/offer';
import { OffersFacade } from '../../services/offers-facade/offers.facade';
import { OffersFilter } from '../../models/offers-filter';
import { OffersFilterOptions } from '../../models/offers-filter-options';

@Component({
  selector: 'offers-page',
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.scss']
})
export class OffersPageComponent implements OnInit {
  offers$: Observable<Offer[]>;
  filterOptions: OffersFilterOptions;
  allOffersLoaded$: Observable<boolean>;
  isUpdating$: Observable<boolean>;

  private reloadTrigger: BehaviorSubject<OffersFilter|undefined>;

  constructor(private offersFacade: OffersFacade) { 
    this.offers$ = this.offersFacade.getOffers();
    this.filterOptions = {}
    this.allOffersLoaded$ = this.offersFacade.allOffersLoaded();
    this.isUpdating$ = this.offersFacade.isOffersListUpdating();

    this.reloadTrigger = new BehaviorSubject<OffersFilter|undefined>(undefined);
  }

  ngOnInit(): void {
    forkJoin([
      this.offersFacade.getFilterOptions(),
      //this.offersFacade.loadOffers()
    ]).subscribe(([options]) => this.filterOptions = options)

    this.reloadTrigger
        .pipe(switchMap(filter => this.offersFacade.loadOffers(filter)))
        .subscribe();
  }

  fetchMore(): void {
    this.offersFacade.fetchMoreOffers(this.reloadTrigger.value);
  }

  applyFilter(filter: OffersFilter): void {
    this.reloadTrigger.next(filter);
  }
}
