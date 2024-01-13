import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApplicationItemComponent } from './user-application-item.component';

describe('UserApplicationItemComponent', () => {
  let component: UserApplicationItemComponent;
  let fixture: ComponentFixture<UserApplicationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserApplicationItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserApplicationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
