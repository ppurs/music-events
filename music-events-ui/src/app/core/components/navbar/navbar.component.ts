import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { SubnavbarComponent } from '../subnavbar/subnavbar.component';

@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('subnavbar') 
  private subnav!: SubnavbarComponent;
  
  constructor(private router: Router) { }

  redirect(route: string): void {
    this.router.navigate(['/', route]);
  }

  toggleSubnav(): void {
    this.subnav.toggle();
  }
}
