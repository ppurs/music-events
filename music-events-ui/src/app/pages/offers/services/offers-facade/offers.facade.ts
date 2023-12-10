import { Observable, catchError, shareReplay, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { MusicProfile } from 'src/app/shared/models/music-profile';
import { Offer } from '../../models/offer';
import { OffersFilter } from '../../models/offers-filter';
import { OffersFilterOptions } from '../../models/offers-filter-options';
import { OffersService } from '../offers-service/offers.service';
import { OffersState } from '../offers-state/offers.state';

@Injectable({
  providedIn: 'root'
})
export class OffersFacade {
  private filterOptions$: Observable<OffersFilterOptions>

  constructor(private offersService: OffersService,
              private offersState: OffersState) {
    this.filterOptions$ = this.offersService.getFilterOptions()
                                            .pipe(shareReplay(1))
  }

  getOffers(): Observable<Offer[]> {
    return this.offersState.getOffers$();
  }

  getFilterOptions() {
    return this.filterOptions$;
  }

  loadOffers(filter?: OffersFilter) {
    return this.offersService.getOffers(filter)
              .pipe(tap(offers => this.offersState.setOffers(offers)));
  }      

  fetchMoreOffers(filter?: OffersFilter) {
    this.offersState.allOffersLoaded$().subscribe({
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

  applyForOffer(offerId: number, profile: MusicProfile): Observable<any> {
    console.log(offerId, profile)
    return this.offersService.applyForOffer(offerId, profile);
  }

  // addNewOffer(offer: Offer): Observable<any> {
  //   this.offersState.addNewOffer(offer);
    
  //   return this.offersService.createOffer(offer).pipe(
  //     tap( res => {
  //         var addedOfferWithId: Offer = offer
  //         addedOfferWithId.id = res.offerId
  //         this.offersState.updateOfferId(offer, addedOfferWithId)    
  //     }),
  //     catchError( error => {
  //       this.offersState.removeOffer(offer);
  //       console.log(error);
  //       return error;
  //     })
  //   );
  // }

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
