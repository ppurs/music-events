import { ProfileState } from './profile.state';
import { TestBed } from '@angular/core/testing';

describe('ProfileService', () => {
  let service: ProfileState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
