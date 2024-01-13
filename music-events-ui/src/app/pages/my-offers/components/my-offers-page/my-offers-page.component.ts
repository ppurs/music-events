import { Component, OnInit } from '@angular/core';
import { Observable, Subject, forkJoin, switchMap } from 'rxjs';

import { AddOfferFormComponent } from '../add-offer-form/add-offer-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MyOffersFacade } from '../../services/my-offers-facade/my-offers.facade';
import { Offer } from 'src/app/pages/offers/models/offer';
import { OffersFilter } from 'src/app/pages/offers/models/offers-filter';
import { OffersFilterOptions } from 'src/app/pages/offers/models/offers-filter-options';

@Component({
  selector: 'my-offers-page',
  templateUrl: './my-offers-page.component.html',
  styleUrls: ['./my-offers-page.component.scss']
})
export class MyOffersPageComponent implements OnInit {
  offers$: Observable<Offer[]>;
  filterOptions: OffersFilterOptions;
  allOffersLoaded$: Observable<boolean>;
  isUpdating$: Observable<boolean>;

  private reloadTrigger: Subject<OffersFilter>;

  constructor(public dialog: MatDialog,
              private offersFacade: MyOffersFacade) { 
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

  onAdd() {
    const dialogRef = this.dialog.open(AddOfferFormComponent, {
      autoFocus: false 
    })

  }
}
