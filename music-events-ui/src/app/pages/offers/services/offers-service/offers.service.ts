import * as _moment from 'moment';

import { Observable, of } from 'rxjs';

import { Application } from 'src/app/pages/applications/models/application';
import { ApplicationsFilter } from 'src/app/pages/applications/models/applications-filter';
import { CreateResponse } from 'src/app/shared/models/create-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadOffersStrategy } from '../../models/load-offers-startegy';
import { MusicProfile } from 'src/app/pages/profile/models/music-profile';
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

  getOffers( filter?: OffersFilter, offset: number=0, strategy: string=LoadOffersStrategy.ALL ): Observable<Offer[]> {
    return this.http.post<Offer[]>(
      `${this.OFFERS_API}/list/${strategy}`, 
      { 
        filter: filter,
        offset: offset,
      }
    );   
  }

  getFilterOptions(): Observable<OffersFilterOptions> {
    return this.http.get<OffersFilterOptions>(`${this.OFFERS_API}/filters`);
  }

  applyForOffer(offerId: number, profile: OfferApplicationPayload): Observable<any> {
    return this.http.post(
      `${this.OFFERS_API}/apply/${offerId}`, 
      {
        profileId: profile.profileId,
        type: profile.type,
        bandName: profile.bandName,
        instrument: profile.instrument,
        genre: profile.genre
      }
    );
  }

  createOffer(offer: Offer): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(`${this.OFFERS_API}/add`, offer);
  }

  deleteOffer(offerId: number): Observable<any> {
    return this.http.delete(`${this.OFFERS_API}/delete/${offerId}`)
  }

  // updateOffer(offer: Offer): Observable<any> {
  //   return this.http.put(`${this.OFFERS_API}/update/${offer.id}`, offer);
  // }

  acceptApplication(applicationId: number): Observable<any> {
    return this.http.get(`${this.OFFERS_API}/my/applications/${applicationId}/accept`);
  }

  rejectApplication(applicationId: number): Observable<any> {
    return this.http.get(`${this.OFFERS_API}/my/applications/${applicationId}/reject`);
  }

  getOfferApplications(offerId: number, filter?: ApplicationsFilter, offset: number=0): Observable<Application[]> {
    return this.http.post<Application[]>(
      `${this.OFFERS_API}/my/${offerId}/applications`,
      {
        filter: filter,
        offset: offset
      },
    );
  }

  getUserMusicProfiles(): Observable<MusicProfile[]> {
    return this.http.get<MusicProfile[]>(`${this.OFFERS_API}/music-profile-list`);
  }

}
