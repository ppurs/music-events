import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListItemComponent } from './tickets-list-item.component';

describe('TicketsListItemComponent', () => {
  let component: TicketsListItemComponent;
  let fixture: ComponentFixture<TicketsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
