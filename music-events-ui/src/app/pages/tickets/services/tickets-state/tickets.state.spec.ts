import { TestBed } from '@angular/core/testing';
import { TicketsState } from './tickets.state';

describe('TicketsState', () => {
  let service: TicketsState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
