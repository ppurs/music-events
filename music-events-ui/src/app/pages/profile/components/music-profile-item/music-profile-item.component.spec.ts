import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicProfileItemComponent } from './music-profile-item.component';

describe('MusicProfileItemComponent', () => {
  let component: MusicProfileItemComponent;
  let fixture: ComponentFixture<MusicProfileItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicProfileItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicProfileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
