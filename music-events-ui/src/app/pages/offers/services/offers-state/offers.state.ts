import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Offer } from '../../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersState {
  private offers$ = new BehaviorSubject<Offer[]>([])
  private updating$ = new BehaviorSubject<boolean>(false);
  private allLoaded$ = new BehaviorSubject<boolean>(false)
  private readonly LIMIT = 5;

  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getOffers$(): Observable<Offer[]> {
    return this.offers$.asObservable();
  }

  setOffers(offers: Offer[]) {
    this.allLoaded$.next(offers.length < this.LIMIT ? true : false)
    this.offers$.next(offers);
  }

  allOffersLoaded$(): Observable<boolean> {
    return this.allLoaded$.asObservable();
  }

  getOffset(): number {
    return this.offers$.getValue().length;
  }

  addOffers(offers: Offer[]): void {
    this.allLoaded$.next(offers.length < this.LIMIT ? true : false)

    const currentValue = this.offers$.getValue();
    this.offers$.next([...currentValue, ...offers]);
  }

  // addNewOffer(offer: Offer): void {
  //   const currentValue = this.offers$.getValue();
  //   this.offers$.next([offer, ...currentValue]);
  // }

  // updateOffer(updatedOffer: Offer) {
  //   const offers = this.offers$.getValue();
  //   const indexOfUpdated = offers.findIndex(offer => offer.id === updatedOffer.id);
  //   offers[indexOfUpdated] = updatedOffer;
  //   this.offers$.next([...offers]);
  // }

  // updateOfferId(offerToReplace: Offer, addedOfferWithId: Offer) {
  //   const offers = this.offers$.getValue();
  //   const updatedOfferIndex = offers.findIndex(offer => offer === offerToReplace);
  //   offers[updatedOfferIndex] = addedOfferWithId;
  //   this.offers$.next([...offers]);
  // }

  removeOffer(offerToRemove: Offer) {
    const currentValue = this.offers$.getValue();
    this.offers$.next(currentValue.filter(offer => offer !== offerToRemove));
  }
}
