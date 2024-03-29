import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';

import { MatDialogRef } from '@angular/material/dialog';
import { MusicProfile } from 'src/app/pages/profile/models/music-profile';
import { ProfileFacade } from '../../services/profile-facade/profile.facade';
import { RequestStatus } from 'src/app/shared/models/request-status';
import { StatusInfoComponent } from 'src/app/shared/components/status-info/status-info.component';

@Component({
  selector: 'profile-music-profile-form',
  templateUrl: './music-profile-form.component.html',
  styleUrls: ['./music-profile-form.component.scss']
})
export class MusicProfileFormComponent implements OnInit {
  @ViewChild ('statusRef') status!: StatusInfoComponent;
  
  profileForm = this.fb.group({
    type: ['', Validators.required],        
    bandName: [''],
    profileName: ['', Validators.required],
    genre: [],
    instrument: [''],
  })

  types: string[];              
  instruments: string[];        
  genres: string[];  
  isSubmitted: boolean;

  private subscriptions: Subscription[]

  constructor(public dialogRef: MatDialogRef<MusicProfileFormComponent>,
              private fb: FormBuilder,
              private profileFacade: ProfileFacade) {
    this.types = [];    
    this.instruments = [];
    this.genres = [];
    this.isSubmitted = false;
    this.subscriptions = []
  }

  get _type() {
    return this.profileForm.get('type');
  }

  get _bandName() {
    return this.profileForm.get('bandName');
  }

  get _profileName() {
    return this.profileForm.get('profileName');
  }

  get _genre() {
    return this.profileForm.get('genre');
  }

  get _instrument() {
    return this.profileForm.get('instrument');
  }

  ngOnInit(): void {
    forkJoin([
      this.profileFacade.getMusicProfileTypes(),
      this.profileFacade.getInstruments(),
      this.profileFacade.getMusicGenres()
    ]).subscribe(([t, i, g]) =>{
      this.types = t;
      this.instruments = i;
      this.genres = g;
    });

    let sub = this._bandName?.valueChanges.subscribe(val =>{
      if( this._type?.value == 'band')
        this._profileName?.setValue(val)
    });

    this.subscriptions.push(sub!);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if ( this.profileForm.invalid ) {
      this.profileForm.markAllAsTouched();
    }
    else {
      const formValue: MusicProfile = {
        bandName: this._bandName?.value ?? undefined,
        name: this._profileName!.value ?? "",
        type: this._type!.value ?? "",
        genre: this._genre?.value ?? undefined,
        instrument: this._instrument?.value ?? undefined,
      }

      this.isSubmitted = true;
      this.profileForm.disable()
    

      this.profileFacade.addMusicProfile(formValue)
        .subscribe({ 
          next: res => {
            this.status.setStatus(RequestStatus.SUCCESSFUL);
          },
          error: err => {
            this.status.setStatus(RequestStatus.UNSUCCESSFUL);
          }
      })
    }
  }

}
