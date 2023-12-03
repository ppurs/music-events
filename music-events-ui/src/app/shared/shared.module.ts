import { CommonModule } from '@angular/common';
import { FilterItemComponent } from './components/filters/filter-item/filter-item.component';
import { FiltrablePageLayoutComponent } from './layouts/filtrable-page-layout/filtrable-page-layout.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FilterItemComponent,
    FiltrablePageLayoutComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule
  ],
  exports: [
    FilterItemComponent,
    FiltrablePageLayoutComponent,
    ListItemComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
