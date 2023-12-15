import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { SubnavbarComponent } from './components/subnavbar/subnavbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SubnavbarComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    DirectivesModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NavbarComponent,
    SubnavbarComponent
  ]
})
export class CoreModule { }