import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOffersListItemComponent } from './my-offers-list-item.component';

describe('MyOffersListItemComponent', () => {
  let component: MyOffersListItemComponent;
  let fixture: ComponentFixture<MyOffersListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOffersListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOffersListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
