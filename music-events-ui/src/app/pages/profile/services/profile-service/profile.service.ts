import { CreateResponse } from 'src/app/shared/models/create-response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MusicProfile } from 'src/app/pages/profile/models/music-profile';
import { Observable } from 'rxjs';
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

  createMusicProfile(profile: MusicProfile): Observable<CreateResponse> {
    return this.http.post<CreateResponse>(`${this.MUSIC_PROFILE_API}/add`, profile);
  }

  deleteMusicProfile(profileId: number): Observable<any> {
    return this.http.delete(`${this.MUSIC_PROFILE_API}/delete/${profileId}`)
  }
}
