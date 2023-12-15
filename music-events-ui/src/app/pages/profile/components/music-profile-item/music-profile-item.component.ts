import { Component, Input } from '@angular/core';

import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MusicProfile } from 'src/app/pages/profile/models/music-profile';
import { ProfileFacade } from '../../services/profile-facade/profile.facade';

@Component({
  selector: 'profile-music-profile-item',
  templateUrl: './music-profile-item.component.html',
  styleUrls: ['./music-profile-item.component.scss']
})
export class MusicProfileItemComponent {
  @Input() musicProfile!: MusicProfile;

  isUpdating: boolean;

  constructor(public dialog: MatDialog,
              private profileFacade: ProfileFacade) { 
    this.isUpdating = false;
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        type: "music profile",
        name: this.musicProfile.profileName,
      }
    })

    dialogRef.afterClosed().subscribe((val) => {
      if(val) {
        this.isUpdating = true;        
        this.profileFacade.deleteMusicProfile(this.musicProfile).subscribe({
          error: () => this.isUpdating = false
        })
      }
    })
  }
}
