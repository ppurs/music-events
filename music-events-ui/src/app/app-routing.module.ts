import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [ 
  { path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsModule)
  },
  { path: 'offers',
    loadChildren: () => import('./pages/offers/offers.module').then(m => m.OffersModule)
  },
  { path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
