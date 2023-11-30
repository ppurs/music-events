import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    MatButtonModule,
    MatIconModule,
    AuthModule
  ],
  exports: [
    NavbarComponent,
    SubnavbarComponent
  ]
})
export class CoreModule { }
