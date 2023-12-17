import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsFilterComponent } from './tickets-filter.component';

describe('TicketsFilterComponent', () => {
  let component: TicketsFilterComponent;
  let fixture: ComponentFixture<TicketsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
