import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';

import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { MyOffersFacade } from '../../services/my-offers-facade/my-offers.facade';
import { Offer } from 'src/app/pages/offers/models/offer';

@Component({
  selector: 'my-offers-list-item',
  templateUrl: './my-offers-list-item.component.html',
  styleUrls: ['./my-offers-list-item.component.scss']
})
export class MyOffersListItemComponent {
  @Input() offer!: Offer;
  
  isUpdating: boolean;

  private readonly DETAILS_OFFER_PATH = 'details';

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private offersFacade: MyOffersFacade) { 
    this.isUpdating = false;
  }

  openDetails(): void {
    if(!this.isUpdating) {
      this.router.navigate([this.DETAILS_OFFER_PATH, this.offer.id], {relativeTo: this.route})
    } 
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
