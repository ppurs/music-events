import * as _moment from 'moment';

import { Observable, of } from 'rxjs';

import { CreateOfferResponse } from '../../models/create-offer.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicProfile } from 'src/app/shared/models/music-profile';
import { Offer } from '../../models/offer';
import { OffersFilter } from '../../models/offers-filter';
import { OffersFilterOptions } from '../../models/offers-filter-options';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private readonly OFFERS_API = "/api/offers";

  constructor(private http: HttpClient) { }

  getOffers( filter?: OffersFilter, offset: number=0 ): Observable<Offer[]> {
    return this.http.post<Offer[]>(
      `${this.OFFERS_API}/list`, 
      { 
        filter: filter,
        offset: offset 
      }
    );   
  }

  getFilterOptions(): Observable<OffersFilterOptions> {
    return this.http.get<OffersFilterOptions>(`${this.OFFERS_API}/filters`);
  }

  applyForOffer(offerId: number, profile: MusicProfile): Observable<any> {
    return this.http.post(
      `${this.OFFERS_API}/apply`, 
      {
        offerId: offerId,
        profile: profile
      }
    );
  }

  // createOffer(offer: Offer): Observable<CreateOfferResponse> {
  //   return this.http.post<CreateOfferResponse>(`${this.OFFERS_API}/add`, offer);
  // }

  deleteOffer(offerId: number): Observable<any> {
    return this.http.delete(`${this.OFFERS_API}/delete/${offerId}`)
  }

  // updateOffer(offer: Offer): Observable<any> {
  //   return this.http.put(`${this.OFFERS_API}/update/${offer.id}`, offer);
  // }
}
