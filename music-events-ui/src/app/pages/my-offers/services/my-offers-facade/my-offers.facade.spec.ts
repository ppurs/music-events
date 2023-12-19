import { MyOffersFacade } from './my-offers.facade';
import { TestBed } from '@angular/core/testing';

describe('MyOffersFacade', () => {
  let service: MyOffersFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyOffersFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
