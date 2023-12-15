import { Observable, catchError, shareReplay, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { MusicProfile } from 'src/app/shared/models/music-profile';
import { ProfileDetails } from '../../models/profile-details';
import { ProfileService } from '../profile-service/profile.service';
import { ProfileState } from '../profile-state/profile.state';

@Injectable({
  providedIn: 'root'
})
export class ProfileFacade {
  private instruments$: Observable<string[]>
  private musicGenres$: Observable<string[]>
  private musicProfileTypes$: Observable<string[]>

  constructor(private profileService: ProfileService,
              private profileState: ProfileState) {
    this.instruments$ = this.profileService.getInstruments().pipe(shareReplay(1));
    this.musicGenres$ = this.profileService.getMusicGenres().pipe(shareReplay(1));
    this.musicProfileTypes$ = this.profileService.getMusicProfileTypes().pipe(shareReplay(1));
  }

  getProfileDetails(): Observable<ProfileDetails> {
    return this.profileState.getProfileDetails(); 
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

  loadProfileDetails() {
    return this.profileService.getProfileDetails()
                .pipe(tap(res => this.profileState.setProfileDetails(res)));
  }

  addMusicProfile(profile: MusicProfile): Observable<any> {
    this.profileState.addMusicProfile(profile);
    
      return this.profileService.createMusicProfile(profile).pipe(
        tap( res => {
            var addedProfileWithId: MusicProfile = profile
            addedProfileWithId.id = res.profileId;
            this.profileState.updateMusicProfileId(profile, addedProfileWithId)    
        }),
        catchError( error => {
          this.profileState.removeMusicProfile(profile);
          console.log(error);
          return error;
        })
      );
  }

  deleteMusicProfile(profile: MusicProfile): Observable<any> {
    return this.profileService.deleteMusicProfile(profile.id!).pipe(      
      tap( () => this.profileState.removeMusicProfile(profile)),
      catchError( error => {
        console.log(error);
        return error;
      })    
    );
  }
}
