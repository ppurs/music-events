import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class SubnavbarComponent implements OnInit {
  @Input() expanded: boolean
  isLogged: boolean
  
  private logSubscription?: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    this.expanded = false;
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.logSubscription = this.auth.isLoggedIn$.subscribe( res => this.isLogged = res );
  }

  ngOnDestroy(): void {
    this.logSubscription?.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
    this.redirect('home');
  }

  redirect(route: string): void {
    this.router.navigate(['/', route]);
  }

  toggle(): void {
    this.expanded = !this.expanded;
  }

}
