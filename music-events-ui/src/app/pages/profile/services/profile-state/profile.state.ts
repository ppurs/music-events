import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { MusicProfile } from 'src/app/shared/models/music-profile';
import { ProfileDetails } from '../../models/profile-details';

@Injectable({
  providedIn: 'root'
})
export class ProfileState {
  private details$ = new BehaviorSubject<ProfileDetails>({email: "", firstName: "", lastName: "", musicProfiles: []});
  private updating$ = new BehaviorSubject<boolean>(false);

  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  setProfileDetails(details: ProfileDetails): void {
    this.details$.next(details);
  }

  getProfileDetails(): Observable<ProfileDetails> {
    return this.details$.asObservable();
  }

  addMusicProfile(profile: MusicProfile): void {
    const currentMProfiles = this.details$.getValue().musicProfiles;
    const newValue = this.details$.getValue();
    newValue.musicProfiles = [profile, ...currentMProfiles]
    
    this.details$.next(newValue);
  }

  updateMusicProfileId(profileToReplace: MusicProfile, profileWithId: MusicProfile): void {
    const currentMProfiles = this.details$.getValue().musicProfiles;
    const newValue = this.details$.getValue();
      
    const updatedProfileIndex = currentMProfiles.findIndex(profile => profile === profileToReplace);
    newValue.musicProfiles[updatedProfileIndex] = profileWithId;
    
    this.details$.next(newValue);
  }

  removeMusicProfile(profileToRemove: MusicProfile): void {
    const currentMProfiles = this.details$.getValue().musicProfiles;
    const newValue = this.details$.getValue();
    newValue.musicProfiles = currentMProfiles.filter(profile => profile !== profileToRemove)
    
    this.details$.next(newValue);
  }
}
