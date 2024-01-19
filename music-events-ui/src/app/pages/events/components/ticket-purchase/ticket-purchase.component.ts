import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { EventsFacade } from '../../services/events-facade/events.facade';
import { MatDialog } from '@angular/material/dialog';
import { MusicEvent } from '../../models/music-event';
import { MatStepper } from '@angular/material/stepper';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'events-ticket-purchase',
  templateUrl: './ticket-purchase.component.html',
  styleUrls: ['./ticket-purchase.component.scss']
})
export class TicketPurchaseComponent implements OnInit {
  event!: MusicEvent;
  isEditable: boolean;
  summary: number = -1;

  purchaseForm = this.fb.group({
    noTickets: [1, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]]
  })

  private orderId?: number;

  constructor(public dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private eventsFacade: EventsFacade,
              private fb: FormBuilder) { 
    this.isEditable = true;
  }

  get noTickets() {
    return this.purchaseForm.get('noTickets');
  }
    

  ngOnInit(): void {
    this.getEvent();
  }

  private getEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventsFacade.getEvent(id).subscribe( res => this.event = res )
  }

  goToSummary(stepper: MatStepper): void {
    if (this.purchaseForm.invalid) {
      this.purchaseForm.markAllAsTouched();
      return;
    }

    this.eventsFacade.getPurchaseSummary(this.event, <number>this.noTickets?.value)
      .subscribe( res => {
        if( res.result ){
          this.summary = res.total;
          stepper.next();
        }
        else {
          this.onError(res.error)
        }
      }
    );
  }

  onSummaryConfirm(stepper: MatStepper): void { 
    if (this.summary == 0) {
      this.isEditable = false;
      stepper.selectedIndex = 2;
      stepper.next()
      return;
    }

    this.eventsFacade.bookTickets(this.event, <number>this.noTickets?.value).subscribe({
      next: res => {
        if ( res.result ) {
          this.orderId = res.orderId;
            stepper.next();
            this.isEditable = false;
        }
        else {
          this.onError(res.error);
        }
      } 
    })
  }

  onPaymentCancel(): void {
    this.router.navigate(['/events']);
  }

  onPaymentConfirm(stepper: MatStepper): void {
    this.eventsFacade.confirmPayment(this.orderId!).subscribe();
    stepper.next()
  }

  private onError(error: any) {
    const errDialogRef = this.dialog.open(ErrorDialogComponent, {data: error});
    errDialogRef.afterClosed().subscribe( () => this.router.navigate(['/events']));
  }

}
