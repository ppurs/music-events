import * as _moment from 'moment';

import { Observable, of } from 'rxjs';

import { CreateOfferResponse } from '../../models/create-offer.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offer } from '../../models/offer';
import { OfferApplicationPayload } from '../../models/offer-application-payload';
import { OffersFilter } from '../../models/offers-filter';
import { OffersFilterOptions } from '../../models/offers-filter-options';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private readonly OFFERS_API = "/api/offers";

  constructor(private http: HttpClient) { }

  getOffers( filter?: OffersFilter, offset: number=0, strategy: string='all' ): Observable<Offer[]> {
    return this.http.post<Offer[]>(
      `${this.OFFERS_API}/list`, 
      { 
        filter: filter,
        offset: offset,
        strategy: strategy
      }
    );   
  }

  getFilterOptions(): Observable<OffersFilterOptions> {
    return this.http.get<OffersFilterOptions>(`${this.OFFERS_API}/filters`);
  }

  applyForOffer(offerId: number, profile: OfferApplicationPayload): Observable<any> {
    return this.http.post(
      `${this.OFFERS_API}/apply`, 
      {
        offerId: offerId,
        profile: profile
      }
    );
  }

  createOffer(offer: Offer): Observable<CreateOfferResponse> {
    return this.http.post<CreateOfferResponse>(`${this.OFFERS_API}/add`, offer);
  }

  deleteOffer(offerId: number): Observable<any> {
    return this.http.delete(`${this.OFFERS_API}/delete/${offerId}`)
  }

  // updateOffer(offer: Offer): Observable<any> {
  //   return this.http.put(`${this.OFFERS_API}/update/${offer.id}`, offer);
  // }
}
