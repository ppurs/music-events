import { EventsFacade } from './events.facade';
import { TestBed } from '@angular/core/testing';

describe('EventsFacade', () => {
  let service: EventsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
