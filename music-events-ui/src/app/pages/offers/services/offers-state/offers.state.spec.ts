import { OffersState } from './offers.state';
import { TestBed } from '@angular/core/testing';

describe('OffersStateService', () => {
  let service: OffersState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
