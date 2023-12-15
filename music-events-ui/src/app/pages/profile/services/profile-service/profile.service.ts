import { Observable, map, of } from 'rxjs';

import { AddMusicProfileResponse } from '../../models/add-music-profile-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicProfile } from 'src/app/shared/models/music-profile';
import { ProfileDetails } from '../../models/profile-details';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly PROFILE_API = "/api/profile";
  private readonly MUSIC_PROFILE_API = "/api/profile/music-profile"

  constructor(private http: HttpClient) { }

  getProfileDetails(): Observable<ProfileDetails> {
    return this.http.get<ProfileDetails>(`${this.PROFILE_API}/details`)
  }

  getInstruments(): Observable<string[]> {
    return this.http.get<{instruments: string[]}>("assets/static/instruments.json")
      .pipe(map(data => data.instruments));
  }

  getMusicGenres(): Observable<string[]> {
    return this.http.get<{genres: string[]}>("assets/static/genres.json")
      .pipe(map(data => data.genres));
  }

  getMusicProfileTypes(): Observable<string[]> {
    return of(["Band", "Instrumentalist", "Singer"]);
    //return this.http.get<string[]>(`${this.MUSIC_PROFILE_API}/types`);
  }

  createMusicProfile(profile: MusicProfile): Observable<AddMusicProfileResponse> {
    return this.http.post<AddMusicProfileResponse>(`${this.MUSIC_PROFILE_API}/add`, profile);
  }

  deleteMusicProfile(profileId: number): Observable<any> {
    return this.http.delete(`${this.MUSIC_PROFILE_API}/delete/${profileId}`)
  }
}
