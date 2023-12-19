import { Observable, first, shareReplay, tap } from 'rxjs';

import { Application } from '../../models/application';
import { ApplicationsFilter } from '../../models/applications-filter';
import { ApplicationsFilterOptions } from '../../models/applications-filter-options';
import { ApplicationsService } from '../applications-service/applications.service';
import { ApplicationsState } from '../applications-state/applications.state';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsFacade {
  private filterOptions$: Observable<ApplicationsFilterOptions>

  constructor(private applicationsService: ApplicationsService,
              private applicationsState: ApplicationsState) {
    this.filterOptions$ = this.applicationsService.getFilterOptions()
                                .pipe(shareReplay(1))
  }

  getApplications(): Observable<Application[]> {
    return this.applicationsState.getApplications$();
  }
  
  getFilterOptions() {
    return this.filterOptions$;
  }
            
  loadApplications(filter?: ApplicationsFilter) {  
    this.applicationsState.setUpdating(true);
            
    return this.applicationsService.getApplications(filter)
              .pipe(tap(applications => {
                this.applicationsState.setApplications(applications);
                this.applicationsState.setUpdating(false);
              }
            ));
  }    
              
  isApplicationsListUpdating(): Observable<boolean> {
    return this.applicationsState.isUpdating$();
  }
            
  allApplicationsLoaded(): Observable<boolean> {
    return this.applicationsState.allApplicationsLoaded$()
  }
            
  fetchMoreApplications(filter?: ApplicationsFilter) {
    this.applicationsState.allApplicationsLoaded$().pipe(first()).subscribe({
      next: res => {
        if(!res) {
          this.applicationsService.getApplications(filter, this.applicationsState.getOffset()).subscribe({
            next: results => this.applicationsState.addApplications(results),
            error: error => console.log(error),
            complete: () => this.applicationsState.setUpdating(false)
          })
        }
      }
    })
  }  
}
