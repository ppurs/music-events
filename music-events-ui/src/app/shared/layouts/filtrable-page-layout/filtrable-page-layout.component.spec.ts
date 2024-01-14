import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrablePageLayoutComponent } from './filtrable-page-layout.component';

describe('FiltrablePageLayoutComponent', () => {
  let component: FiltrablePageLayoutComponent;
  let fixture: ComponentFixture<FiltrablePageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrablePageLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltrablePageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
