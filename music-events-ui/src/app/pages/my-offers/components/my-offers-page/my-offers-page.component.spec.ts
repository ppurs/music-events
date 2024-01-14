import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOffersPageComponent } from './my-offers-page.component';

describe('MyOffersPageComponent', () => {
  let component: MyOffersPageComponent;
  let fixture: ComponentFixture<MyOffersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOffersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOffersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
