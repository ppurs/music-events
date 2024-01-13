import { Observable, catchError, first, shareReplay, tap } from 'rxjs';

import { Application } from 'src/app/pages/applications/models/application';
import { ApplicationsFilter } from 'src/app/pages/applications/models/applications-filter';
import { ApplicationsFilterOptions } from 'src/app/pages/applications/models/applications-filter-options';
import { ApplicationsService } from 'src/app/pages/applications/services/applications-service/applications.service';
import { ApplicationsState } from 'src/app/pages/applications/services/applications-state/applications.state';
import { Injectable } from '@angular/core';
import { LoadOffersStrategy } from 'src/app/pages/offers/models/load-offers-startegy';
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
  private applicationFilterOptions$: Observable<ApplicationsFilterOptions>

  constructor(private offersService: OffersService,
              private offersState: OffersState,
              private applicationsService: ApplicationsService,
              private applicationsState: ApplicationsState,
              private sharedService: SharedService) {
    this.filterOptions$ = this.offersService.getFilterOptions()
                                            .pipe(shareReplay(1))
    this.musicGenres$ = this.sharedService.getMusicGenres().pipe(shareReplay(1));
    this.cities$ = this.sharedService.getCities().pipe(shareReplay(1));
    this.eventTypes$ = this.sharedService.getEventTypes().pipe(shareReplay(1));
    this.applicationFilterOptions$ = this.applicationsService.getFilterOptions()
                                                            .pipe(shareReplay(1));
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

    return this.offersService.getOffers(filter, undefined, LoadOffersStrategy.USER)
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
          addedOfferWithId.id = res.insertedId
          
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

  acceptApplication(applicationId: number): Observable<any> {
    this.applicationsState.updateApplicationStatus(applicationId, "ACCEPTED")

    return this.offersService.acceptApplication(applicationId)
      .pipe(
        catchError( error => {
          this.applicationsState.updateApplicationStatus(applicationId, "SUBMITTED");

          return error;
        }
      )
    );
  }

  rejectApplication(applicationId: number): any {
    this.applicationsState.updateApplicationStatus(applicationId, "REJECTED")

    return this.offersService.rejectApplication(applicationId)
      .pipe(
        catchError( error => {
          this.applicationsState.updateApplicationStatus(applicationId, "SUBMITTED");

          return error;
        }
      )
    );
  }

  loadOfferApplications(offerId: number, filter?: ApplicationsFilter) {
    this.applicationsState.setUpdating(true);
            
    return this.offersService.getOfferApplications(offerId, filter, undefined)
              .pipe(tap(applications => {
                this.applicationsState.setApplications(applications);
                this.applicationsState.setUpdating(false);
              }
            ));
  }

  getOfferApplications(): Observable<Application[]> {
    return this.applicationsState.getApplications$();
  }

  fetchMoreApplications(offerId: number, filter?: ApplicationsFilter) {
    this.applicationsState.allApplicationsLoaded$().pipe(first()).subscribe({
      next: res => {
        if(!res) {
          this.offersService.getOfferApplications(offerId, filter, this.applicationsState.getOffset()).subscribe({
            next: results => this.applicationsState.addApplications(results),
            error: error => console.log(error),
            complete: () => this.applicationsState.setUpdating(false)
          })
        }
      }
    })
  }  

  getApplicationFilterOptions(): Observable<ApplicationsFilterOptions> {
    return this.applicationFilterOptions$;
  }

  allApplicationsLoaded(): Observable<boolean> {
    return this.applicationsState.allApplicationsLoaded$();
  }

  isApplicationListUpdating(): Observable<boolean> {
    return this.applicationsState.isUpdating$();
  }
}
