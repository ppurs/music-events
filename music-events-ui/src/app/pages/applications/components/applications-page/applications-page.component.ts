import { Component, OnInit } from '@angular/core';
import { Observable, Subject, forkJoin, switchMap } from 'rxjs';

import { Application } from '../../models/application';
import { ApplicationsFacade } from '../../services/applications-facade/applications.facade';
import { ApplicationsFilter } from '../../models/applications-filter';
import { ApplicationsFilterOptions } from '../../models/applications-filter-options';

@Component({
  selector: 'applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.scss']
})
export class ApplicationsPageComponent implements OnInit {
  applications$: Observable<Application[]>;
  allApplicationsLoaded$: Observable<boolean>;
  isUpdating$: Observable<boolean>;
  filterOptions: ApplicationsFilterOptions;

  private reloadTrigger: Subject<ApplicationsFilter>;

  constructor(private applicationsFacade: ApplicationsFacade) { 
    this.applications$ = this.applicationsFacade.getApplications();
    this.allApplicationsLoaded$ = this.applicationsFacade.allApplicationsLoaded();
    this.isUpdating$ = this.applicationsFacade.isApplicationsListUpdating();
    this.filterOptions = {statuses: []};

    this.reloadTrigger = new Subject<ApplicationsFilter>();
  }

  ngOnInit(): void {
    forkJoin([
      this.applicationsFacade.getFilterOptions(),
      this.applicationsFacade.loadApplications()
    ]).subscribe(([options, events]) => this.filterOptions = options)

    this.reloadTrigger
        .pipe(switchMap(filter => this.applicationsFacade.loadApplications(filter)))
        .subscribe();
  }

  fetchMore(): void {
    this.applicationsFacade.fetchMoreApplications();
  }

  applyFilter(filter: ApplicationsFilter): void {
    this.reloadTrigger.next(filter);
  }
}
