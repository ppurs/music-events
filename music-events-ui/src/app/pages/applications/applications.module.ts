import { ApplicationsPageComponent } from './components/applications-page/applications-page.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApplicationsFilterComponent } from './components/applications-filter/applications-filter.component';
import { ApplicationsListItemComponent } from './components/applications-list-item/applications-list-item.component';

@NgModule({
  declarations: [
    ApplicationsPageComponent,
    ApplicationsFilterComponent,
    ApplicationsListItemComponent
  ],
  imports: [
    ApplicationsRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ApplicationsModule { }
