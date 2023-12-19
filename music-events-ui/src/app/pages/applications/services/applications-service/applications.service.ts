import { Observable, of } from 'rxjs';

import { Application } from '../../models/application';
import { ApplicationsFilter } from '../../models/applications-filter';
import { ApplicationsFilterOptions } from '../../models/applications-filter-options';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private readonly APPLICATIONS_API = '/applications'

  constructor(private http: HttpClient) { }

  getApplications( filter?: ApplicationsFilter, offset: number=0 ): Observable<Application[]> {
    return this.http.post<Application[]>(
      this.APPLICATIONS_API + '/list', 
      { 
        filter: filter,
        offset: offset 
      }
    );       
  }

  getFilterOptions(): Observable<ApplicationsFilterOptions> {
    return this.http.get<ApplicationsFilterOptions>(this.APPLICATIONS_API + '/filters');
  }
}
