import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterItemComponent } from './FilterItemComponent';

describe('FilterItemComponent', () => {
  let component: FilterItemComponent;
  let fixture: ComponentFixture<FilterItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
