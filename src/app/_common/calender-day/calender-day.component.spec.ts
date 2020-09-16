import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderDayComponent } from './calender-day.component';

describe('CalenderDayComponent', () => {
  let component: CalenderDayComponent;
  let fixture: ComponentFixture<CalenderDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
