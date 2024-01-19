import { RouterModule, Routes } from '@angular/router';

import { AppGuard } from './core/auth/helpers/app-guard/app-guard.service';
import { NgModule } from '@angular/core';
import { Role } from './core/auth/models/role';

const routes: Routes = [ 
  { 
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule)
  },
  { 
    path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then(m => m.OffersModule)
  },
  { 
    path: 'profile',
    canActivate: [AppGuard],
    data: {
      roles: [Role.USER, Role.ADMIN]
    },  
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  { 
    path: 'tickets',
    canActivate: [AppGuard],
    data: {
      roles: [Role.USER]
    }, 
    loadChildren: () => import('./pages/tickets/tickets.module').then(m => m.TicketsModule)
  },
  { 
    path: 'applications',
    canActivate: [AppGuard],
    data: {
      roles: [Role.USER]
    },  
    loadChildren: () => import('./pages/applications/applications.module').then(m => m.ApplicationsModule)
  },
  { path: 'my-offers',
    canActivate: [AppGuard],
    data: {
      roles: [Role.ORGANIZER]
    },  
    loadChildren: () => import('./pages/my-offers/my-offers.module').then(m => m.MyOffersModule)
  },
  { path: '', 
    pathMatch: 'full',  
    redirectTo: 'events' 
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
