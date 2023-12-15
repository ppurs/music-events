import { Component, Input } from '@angular/core';

import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Offer } from '../../models/offer';
import { OfferDetailsDialogComponent } from '../offer-details-dialog/offer-details-dialog.component';
import { OffersFacade } from '../../services/offers-facade/offers.facade';
import { Role } from 'src/app/core/auth/models/role';

@Component({
  selector: 'offers-list-item',
  templateUrl: './offers-list-item.component.html',
  styleUrls: ['./offers-list-item.component.scss']
})
export class OffersListItemComponent {
  @Input() offer!: Offer;

  readonly ADMIN_ROLE: Role = Role.ADMIN

  isUpdating: boolean;

  constructor(public dialog: MatDialog,
              private offersFacade: OffersFacade) { 
    this.isUpdating = false;
  }

  openDetails(): void {
    this.dialog.open(OfferDetailsDialogComponent, {
      data: { offer: this.offer,
              musicProfiles: [{id: 1, name: 'Band'}, {id: 2, name:"solo"}]
            },
      autoFocus: false 
    });
  }

  onDelete(event: any): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        type: "offer",
        name: this.offer.title,
      }
    })

    event.stopPropagation();

    dialogRef.afterClosed().subscribe((val) => {
      if(val) {
        this.isUpdating = true;        
        this.offersFacade.deleteOffer(this.offer).subscribe({
          error: () => this.isUpdating = false
        })
      }
    })
  }
}
