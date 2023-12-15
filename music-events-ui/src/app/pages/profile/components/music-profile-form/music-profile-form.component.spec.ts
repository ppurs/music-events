import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicProfileFormComponent } from './music-profile-form.component';

describe('MusicProfileFormComponent', () => {
  let component: MusicProfileFormComponent;
  let fixture: ComponentFixture<MusicProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicProfileFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
