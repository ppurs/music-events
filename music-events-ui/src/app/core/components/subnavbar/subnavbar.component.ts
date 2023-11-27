import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Router } from '@angular/router';

@Component({
  selector: 'core-subnavbar',
  templateUrl: './subnavbar.component.html',
  styleUrls: ['./subnavbar.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
       top: '54px',
      })),
      state('closed', style({
        top: '18px'
      })),
      transition('open <=> closed', [
        animate('0.15s')
      ]),
    ]),
  ],
})
export class SubnavbarComponent {
  @Input() expanded: boolean

  constructor(private router: Router) {
    this.expanded = true;
  }

  logout(): void {
    //after logout
    this.redirect('home');
  }

  redirect(route: string): void {
    this.router.navigate(['/', route]);
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }

}
