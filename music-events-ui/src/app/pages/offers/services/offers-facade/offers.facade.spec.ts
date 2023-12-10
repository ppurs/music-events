import { OffersFacade } from './offers.facade';
import { TestBed } from '@angular/core/testing';

describe('OffersFacadeService', () => {
  let service: OffersFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
