import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsListItemComponent } from './applications-list-item.component';

describe('ApplicationsListItemComponent', () => {
  let component: ApplicationsListItemComponent;
  let fixture: ComponentFixture<ApplicationsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
