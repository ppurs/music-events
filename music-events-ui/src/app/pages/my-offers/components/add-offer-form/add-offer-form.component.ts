import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

import { DATE_FORMATS } from 'src/app/shared/models/date-formats';
import { MatDialogRef } from '@angular/material/dialog';
import { MyOffersFacade } from '../../services/my-offers-facade/my-offers.facade';
import { Offer } from 'src/app/pages/offers/models/offer';
import { RequestStatus } from 'src/app/shared/models/request-status';
import { StatusInfoComponent } from 'src/app/shared/components/status-info/status-info.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-offer-form',
  templateUrl: './add-offer-form.component.html',
  styleUrls: ['./add-offer-form.component.scss'],
  providers: [{
    provide: MAT_DATE_FORMATS,
    useValue: DATE_FORMATS,
  },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },],
})
export class AddOfferFormComponent implements OnInit {
  @ViewChild ('statusRef') status!: StatusInfoComponent;
  
  offerForm = this.fb.group({
    title:['', Validators.required],
    description:[''],
    city: ['', Validators.required],
    location: [''],
    date: ['', Validators.required], 
    type: ['', Validators.required],
    genre: [''],
  })

  types: string[];              
  genres: string[];  
  cities: string[];
  isSubmitted: boolean;

  constructor(public dialogRef: MatDialogRef<AddOfferFormComponent>,
              private fb: FormBuilder,
              private offersFacade: MyOffersFacade) { 
    this.types = [];    
    this.genres = [];
    this.cities = [];
    this.isSubmitted = false;
  }

  get title() {
    return this.offerForm.get('title');
  }

  get description() {
    return this.offerForm.get('description');
  }

  get city() {
    return this.offerForm.get('city');
  }

  get location() {
    return this.offerForm.get('location');
  }

  get date() {
    return this.offerForm.get('date');
  }

  get type() {
    return this.offerForm.get('type');
  }

  get genre() {
    return this.offerForm.get('genre');
  }

  ngOnInit(): void {
    forkJoin([
      this.offersFacade.getEventTypes(),
      this.offersFacade.getMusicGenres(),
      this.offersFacade.getCities()
    ]).subscribe(([t, g, c]) =>{
      this.types = t;
      this.genres = g;
      this.cities = c;
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if ( this.offerForm.invalid ) {
      this.offerForm.markAllAsTouched();
    }
    else {
      const formValue: Offer = {
        title: this.title?.value ?? "",
        description: this.description?.value ?? "",
        city: this.city?.value ?? "",
        location: this.location?.value ?? "",
        date: this.date?.value ? new Date(this.date.value) : new Date(),
        type: this.type?.value ?? "",
        genre: this.genre?.value ?? ""
      }

      this.isSubmitted = true;
      this.offerForm.disable()
    

      this.offersFacade.addNewOffer(formValue)
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
