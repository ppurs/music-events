import { CommonModule } from '@angular/common';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';
import { FilterItemComponent } from './components/filters/filter-item/filter-item.component';
import { FiltrablePageLayoutComponent } from './layouts/filtrable-page-layout/filtrable-page-layout.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
  declarations: [
    FilterItemComponent,
    FiltrablePageLayoutComponent,
    ListItemComponent,
    TagComponent,
    DetailsDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule
  ],
  exports: [
    DetailsDialogComponent,
    FilterItemComponent,
    FiltrablePageLayoutComponent,
    ListItemComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    TagComponent
  ],
})
export class SharedModule { }
