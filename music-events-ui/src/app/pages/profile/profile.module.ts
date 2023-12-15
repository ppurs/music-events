import { CommonModule } from '@angular/common';
import { MusicProfileFormComponent } from './components/music-profile-form/music-profile-form.component';
import { MusicProfileItemComponent } from './components/music-profile-item/music-profile-item.component';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ProfilePageComponent,
    MusicProfileItemComponent,
    MusicProfileFormComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
