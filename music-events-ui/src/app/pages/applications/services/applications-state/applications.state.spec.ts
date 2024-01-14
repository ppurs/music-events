import { ApplicationsState } from './applications.state';
import { TestBed } from '@angular/core/testing';

describe('ApplicationsState', () => {
  let service: ApplicationsState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
