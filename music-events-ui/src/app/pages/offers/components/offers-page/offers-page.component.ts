import { Component, OnInit } from '@angular/core';
import { Observable, Subject, forkJoin, switchMap } from 'rxjs';

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

  private reloadTrigger: Subject<OffersFilter>;

  constructor(private offersFacade: OffersFacade) { 
    this.offers$ = this.offersFacade.getOffers();
    this.filterOptions = {}
    this.allOffersLoaded$ = this.offersFacade.allOffersLoaded();
    this.isUpdating$ = this.offersFacade.isOffersListUpdating();

    this.reloadTrigger = new Subject<OffersFilter>();
  }

  ngOnInit(): void {
    forkJoin([
      this.offersFacade.getFilterOptions(),
      this.offersFacade.loadOffers()
    ]).subscribe(([options, offers]) => this.filterOptions = options)

    this.reloadTrigger
        .pipe(switchMap(filter => this.offersFacade.loadOffers(filter)))
        .subscribe();
  }

  fetchMore(): void {
    this.offersFacade.fetchMoreOffers();
  }

  applyFilter(filter: OffersFilter): void {
    this.reloadTrigger.next(filter);
  }
}
