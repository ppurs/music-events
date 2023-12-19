import { Observable, catchError, first, shareReplay, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Offer } from 'src/app/pages/offers/models/offer';
import { OffersFilter } from 'src/app/pages/offers/models/offers-filter';
import { OffersFilterOptions } from 'src/app/pages/offers/models/offers-filter-options';
import { OffersService } from 'src/app/pages/offers/services/offers-service/offers.service';
import { OffersState } from 'src/app/pages/offers/services/offers-state/offers.state';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class MyOffersFacade {
  private filterOptions$: Observable<OffersFilterOptions>
  private musicGenres$: Observable<string[]>
  private cities$: Observable<string[]>
  private eventTypes$: Observable<string[]>

  constructor(private offersService: OffersService,
              private offersState: OffersState,
              private sharedService: SharedService) {
    this.filterOptions$ = this.offersService.getFilterOptions()
                                            .pipe(shareReplay(1))
    this.musicGenres$ = this.sharedService.getMusicGenres().pipe(shareReplay(1));
    this.cities$ = this.sharedService.getCities().pipe(shareReplay(1));
    this.eventTypes$ = this.sharedService.getEventTypes().pipe(shareReplay(1));
  }

  getOffers(): Observable<Offer[]> {
    return this.offersState.getOffers$();
  }

  getOffer(id: number): Observable<Offer> {
    return this.offersState.getOffer(id);
  }

  getFilterOptions() {
    return this.filterOptions$;
  }

  getMusicGenres(): Observable<string[]> {
    return this.musicGenres$;
  }

  getCities(): Observable<string[]> {
    return this.cities$;
  }

  getEventTypes(): Observable<string[]> {
    return this.eventTypes$;
  }

  loadOffers(filter?: OffersFilter) {
    this.offersState.setUpdating(true);

    return this.offersService.getOffers(filter, undefined, "user")
              .pipe(tap(offers => {
                this.offersState.setOffers(offers);
                this.offersState.setUpdating(false);
              }
            ));
  }      

  isOffersListUpdating(): Observable<boolean> {
    return this.offersState.isUpdating$();
  }

  allOffersLoaded(): Observable<boolean> {
    return this.offersState.allOffersLoaded$()
  }

  fetchMoreOffers(filter?: OffersFilter) {
    this.offersState.allOffersLoaded$().pipe(first()).subscribe({
      next: res => {
        if(!res) {
          this.offersService.getOffers(filter, this.offersState.getOffset()).subscribe({
            next: results => this.offersState.addOffers(results),
            error: error => console.log(error),
            complete: () => this.offersState.setUpdating(false)
          })
        }
      }
    })
  }

  addNewOffer(offer: Offer): Observable<any> {
    this.offersState.addNewOffer(offer);
    
    return this.offersService.createOffer(offer).pipe(
      tap( res => {
          var addedOfferWithId: Offer = offer
          addedOfferWithId.id = res.offerId
          addedOfferWithId.organizer = res.organizer
          
          this.offersState.updateOfferId(offer, addedOfferWithId)    
      }),
      catchError( error => {
        this.offersState.removeOffer(offer);
        console.log(error);
        return error;
      })
    );
  }

  // updateOffer(offer: Offer): Observable<any> {
  //   return this.offersService.updateOffer(offer).pipe(      
  //     tap( () => this.offersState.updateOffer(offer)),
  //     catchError( error => {
  //       console.log(error);
  //       return error;
  //     })    
  //   );
  // }

  deleteOffer(offer: Offer): Observable<any> {
    return this.offersService.deleteOffer(offer.id!).pipe(      
      tap( () => this.offersState.removeOffer(offer)),
      catchError( error => {
        console.log(error);
        return error;
      })    
    );
  }
}
