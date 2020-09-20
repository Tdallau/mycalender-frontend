import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderEditScreenComponent } from './calender-edit-screen.component';

describe('CalenderEditScreenComponent', () => {
  let component: CalenderEditScreenComponent;
  let fixture: ComponentFixture<CalenderEditScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderEditScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderEditScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
