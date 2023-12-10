import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { OfferDetailsDialogComponent } from './components/offer-details-dialog/offer-details-dialog.component';
import { OffersFilterComponent } from './components/offers-filter/offers-filter.component';
import { OffersListItemComponent } from './components/offers-list-item/offers-list-item.component';
import { OffersPageComponent } from './components/offers-page/offers-page.component';
import { OffersRoutingModule } from './offers-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';

@NgModule({
  declarations: [
    OffersPageComponent,
    OffersFilterComponent,
    OffersListItemComponent,
    OfferDetailsDialogComponent,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatSelectModule, 
    OffersRoutingModule,
    SharedModule
  ]
})
export class OffersModule { }
