import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Offer } from '../../models/offer';
import { MusicProfile } from 'src/app/pages/profile/models/music-profile';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Subscription, forkJoin } from 'rxjs';
import { ApplyStrategy } from './strategy/apply.strategy';
import { ProfileApplyStrategy } from './strategy/profile-apply.strategy';
import { FormApplyStrategy } from './strategy/form-apply.strategy';
import { OffersFacade } from '../../services/offers-facade/offers.facade';
import { StatusInfoComponent } from 'src/app/shared/components/status-info/status-info.component';
import { RequestStatus } from 'src/app/shared/models/request-status';
import { Role } from 'src/app/core/auth/models/role';

@Component({
  selector: 'offer-details-dialog',
  templateUrl: './offer-details-dialog.component.html',
  styleUrls: ['./offer-details-dialog.component.scss']
})
export class OfferDetailsDialogComponent implements OnInit {
  @ViewChild ('statusRef') status!: StatusInfoComponent;

  readonly USER_ROLE: Role = Role.USER

  isLogged: boolean;
  isFormExpanded: boolean;
  isSubmitted: boolean;
  strategy: ApplyStrategy;

  types?: string[];
  instruments?: string[];
  genres?: string[];

  private logSubscription?: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {offer: Offer, musicProfiles?: MusicProfile[]},
              private fb: FormBuilder,
              private auth: AuthService,
              private offersFacade: OffersFacade) {
    this.isLogged = false;
    this.isFormExpanded = false;
    this.isSubmitted = false;
    this.strategy = new ProfileApplyStrategy(fb);
  }

  ngOnInit(): void {
    this.logSubscription = this.auth.isLoggedIn$.subscribe(val => this.isLogged = val);
  }

  ngDestroy(): void {
    this.logSubscription?.unsubscribe();
  }

  changeStrategy(val: string) {
    if(this.isSubmitted) {
      return;
    }

    switch(val) {
      case 'form': {
        if( !this.types ) {
          forkJoin([
            this.offersFacade.getMusicProfileTypes(),
            this.offersFacade.getInstruments(),
            this.offersFacade.getMusicGenres()
          ]).subscribe(([t, i, g]) =>{
            this.types = t;
            this.instruments = i;
            this.genres = g;
          });
        }

        this.isFormExpanded = true;
        this.strategy = new FormApplyStrategy(this.fb);

        break;
      }
      case 'profile': {
        this.isFormExpanded = false;
        this.strategy = new ProfileApplyStrategy(this.fb);

        break;
      }
    }
  }

  onSubmit(): void {
    if ( this.strategy.applicationForm.invalid ) {
      this.strategy.applicationForm.markAllAsTouched();
      return;
    }

    this.isSubmitted = true;
    this.strategy.applicationForm.disable();

    this.offersFacade.applyForOffer(this.data.offer.id!, this.strategy.getFormValue())
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
