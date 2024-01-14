import { Component, ContentChild, TemplateRef } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss']
})
export class DetailsDialogComponent {
  @ContentChild('imgRef') imgTemplate!: TemplateRef<any>;
  @ContentChild('detailsRef') detailsTemplate!: TemplateRef<any>;
  @ContentChild('descRef') descTemplate!: TemplateRef<any>;
  @ContentChild('actionsRef') actionsTemplate?: TemplateRef<any> | null;

  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>) {}

  onClose(): void {
    this.dialogRef.close()
  }
}
