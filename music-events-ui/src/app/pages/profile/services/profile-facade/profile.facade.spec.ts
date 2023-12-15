import { ProfileFacade } from './profile.facade';
import { TestBed } from '@angular/core/testing';

describe('ProfileService', () => {
  let service: ProfileFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
