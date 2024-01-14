import { TestBed } from '@angular/core/testing';
import { TicketsFacade } from './tickets.facade';

describe('TicketsFacade', () => {
  let service: TicketsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
