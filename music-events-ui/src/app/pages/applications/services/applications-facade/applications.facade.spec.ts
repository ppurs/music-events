import { ApplicationsFacade } from './applications.facade';
import { TestBed } from '@angular/core/testing';

describe('ApplicationsFacade', () => {
  let service: ApplicationsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
