import { EventsState } from './events.state';
import { TestBed } from '@angular/core/testing';

describe('EventsState', () => {
  let service: EventsState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
