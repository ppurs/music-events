import { ApplicationDetailsDialogComponent } from './components/application-details-dialog/application-details-dialog.component';
import { ApplicationsFilterComponent } from './components/applications-filter/applications-filter.component';
import { ApplicationsListItemComponent } from './components/applications-list-item/applications-list-item.component';
import { ApplicationsPageComponent } from './components/applications-page/applications-page.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ApplicationsPageComponent,
    ApplicationsFilterComponent,
    ApplicationsListItemComponent,
    ApplicationDetailsDialogComponent
  ],
  imports: [
    ApplicationsRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ApplicationsModule { }
