import { Component, OnInit } from '@angular/core';

import { AccountDetails } from '../../models/account-details';
import { MatDialog } from '@angular/material/dialog';
import { MusicProfile } from 'src/app/pages/profile/models/music-profile';
import { MusicProfileFormComponent } from '../music-profile-form/music-profile-form.component';
import { ProfileFacade } from '../../services/profile-facade/profile.facade';
import { Role } from 'src/app/core/auth/models/role';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  readonly USER_ROLE = Role.USER;
  
  accountDetails: AccountDetails;
  musicProfiles: MusicProfile[];

  detailsSubscription?: Subscription;

  constructor(public dialog: MatDialog,
              private profileFacade: ProfileFacade) {
    this.accountDetails = {email: "", firstName: "", lastName: ""};
    this.musicProfiles = [];
  }

  ngOnInit(): void {
    this.profileFacade.loadProfileDetails().subscribe();
    this.detailsSubscription = this.profileFacade.getProfileDetails()
        .subscribe( val => {
          console.log(val)
          this.accountDetails = val;
          this.musicProfiles = val.musicProfiles;
        })
  }

  ngOnDestroy(): void {
    this.detailsSubscription?.unsubscribe();
  }

  onAddProfileClick(): void {
    this.dialog.open(MusicProfileFormComponent, {
      autoFocus: false 
    });
  }

}
