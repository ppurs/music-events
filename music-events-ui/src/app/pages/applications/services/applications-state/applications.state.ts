import { BehaviorSubject, Observable, of } from 'rxjs';

import { Application } from '../../models/application';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsState {
  private applications$ = new BehaviorSubject<Application[]>([]);
  private updating$ = new BehaviorSubject<boolean>(false);
  private allLoaded$ = new BehaviorSubject<boolean>(false);
  private readonly LIMIT = 5;
  
  isUpdating$(): Observable<boolean> {
    return this.updating$.asObservable();
  }

  setUpdating(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getApplications$(): Observable<Application[]> {
    return this.applications$.asObservable();
  }

  getApplication(id: number): Observable<Application> {
    const application = this.applications$.value.find(e => e.id === id)!;

    return of(application);
  }

  setApplications(applications: Application[]) {
    this.allLoaded$.next(applications.length < this.LIMIT ? true : false);
    this.applications$.next(applications);
  }

  allApplicationsLoaded$(): Observable<boolean> {
    return this.allLoaded$.asObservable();
  }

  getOffset(): number {
    return this.applications$.getValue().length;
  }

  addApplications(Applications: Application[]) {
    this.allLoaded$.next(Applications.length < this.LIMIT ? true : false)

    const currentValue = this.applications$.getValue();
    this.applications$.next([...currentValue, ...Applications]);
  }

  updateApplicationStatus(applicationId: number, status: string): void {
    const applications = this.applications$.getValue();
    const updatedApplicationIndex = applications.findIndex(obj => obj.id === applicationId);
    applications[updatedApplicationIndex].status = status;
    this.applications$.next([...applications]);
  }
}
