import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  today: Date = new Date(2020, 1, 1);
  numberOfDays: number;
  month: string;
  year: number;
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor() {}

  ngOnInit(): void {
    const today = this.today;
    this.numberOfDays = this.getDaysInMonth(
      today.getMonth() + 1,
      today.getFullYear()
    );
    this.month = this.monthNames[today.getMonth()];
    this.year = today.getFullYear();
  }

  getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  createArray(length: number) {
    return new Array(length);
  }
}
