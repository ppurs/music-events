import { Component, Input } from '@angular/core';

import { Application } from '../../models/application';
import { ApplicationDetailsDialogComponent } from '../application-details-dialog/application-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'applications-list-item',
  templateUrl: './applications-list-item.component.html',
  styleUrls: ['./applications-list-item.component.scss']
})
export class ApplicationsListItemComponent {
  @Input() application!: Application;

  constructor(public dialog: MatDialog) { }

  openDetails(): void {
    const dialogRef = this.dialog.open(ApplicationDetailsDialogComponent, {
      data: this.application,
      autoFocus: false 
    });
  }
}
