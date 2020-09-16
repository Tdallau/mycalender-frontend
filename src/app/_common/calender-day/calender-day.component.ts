import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender-day',
  templateUrl: './calender-day.component.html',
  styleUrls: ['./calender-day.component.scss']
})
export class CalenderDayComponent implements OnInit {
  @Input() day: number;

  constructor() { }

  ngOnInit(): void {
  }

}
