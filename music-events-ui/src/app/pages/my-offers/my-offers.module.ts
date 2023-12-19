import { CommonModule } from '@angular/common';
import { MyOfferDetailsComponent } from './components/my-offer-details/my-offer-details.component';
import { MyOffersListItemComponent } from './components/my-offers-list-item/my-offers-list-item.component';
import { MyOffersPageComponent } from './components/my-offers-page/my-offers-page.component';
import { MyOffersRoutingModule } from './my-offers-routing.module';
import { NgModule } from '@angular/core';
import { OffersModule } from '../offers/offers.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddOfferFormComponent } from './components/add-offer-form/add-offer-form.component';

@NgModule({
  declarations: [
    MyOffersPageComponent,
    MyOffersListItemComponent,
    MyOfferDetailsComponent,
    AddOfferFormComponent
  ],
  imports: [
    CommonModule,
    MyOffersRoutingModule,
    OffersModule,
    SharedModule
  ]
})
export class MyOffersModule { }
