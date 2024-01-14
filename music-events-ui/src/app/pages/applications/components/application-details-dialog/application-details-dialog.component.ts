import { Component, Inject, OnInit } from '@angular/core';
import { Application } from '../../models/application';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-application-details-dialog',
  templateUrl: './application-details-dialog.component.html',
  styleUrls: ['./application-details-dialog.component.scss']
})
export class ApplicationDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Application) { }

}
