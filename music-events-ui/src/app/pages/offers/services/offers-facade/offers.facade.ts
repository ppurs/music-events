import { Observable, catchError, shareReplay, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { MusicProfile } from 'src/app/pages/profile/models/music-profile';
import { Offer } from '../../models/offer';
import { OfferApplicationPayload } from '../../models/offer-application-payload';
import { OffersFilter } from '../../models/offers-filter';
import { OffersFilterOptions } from '../../models/offers-filter-options';
import { OffersService } from '../offers-service/offers.service';
import { OffersState } from '../offers-state/offers.state';
import { SharedService } from 'src/app/shared/services/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class OffersFacade {
  private filterOptions$: Observable<OffersFilterOptions>
  private instruments$: Observable<string[]>
  private musicGenres$: Observable<string[]>
  private musicProfileTypes$: Observable<string[]>


  constructor(private offersService: OffersService,
              private offersState: OffersState,
              private sharedService: SharedService) {
    this.filterOptions$ = this.offersService.getFilterOptions()
                                            .pipe(shareReplay(1))
    this.instruments$ = this.sharedService.getInstruments().pipe(shareReplay(1));
    this.musicGenres$ = this.sharedService.getMusicGenres().pipe(shareReplay(1));
    this.musicProfileTypes$ = this.sharedService.getMusicProfileTypes().pipe(shareReplay(1));
  }

  getOffers(): Observable<Offer[]> {
    return this.offersState.getOffers$();
  }

  getFilterOptions() {
    return this.filterOptions$;
  }

  getInstruments(): Observable<string[]> {
    return this.instruments$;
  }

  getMusicGenres(): Observable<string[]> {
    return this.musicGenres$;
  }

  getMusicProfileTypes(): Observable<string[]> {
    return this.musicProfileTypes$;
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

  applyForOffer(offerId: number, profile: OfferApplicationPayload): Observable<any> {
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
