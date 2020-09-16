import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCategoryCardComponent } from './calendar-category-card.component';

describe('CalendarCategoryCardComponent', () => {
  let component: CalendarCategoryCardComponent;
  let fixture: ComponentFixture<CalendarCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarCategoryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
