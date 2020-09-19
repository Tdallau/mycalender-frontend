import { Component, OnInit } from '@angular/core';
import { CalenderService } from 'src/app/_services/calender.service';
import { Event } from '../../_models/event';
import * as moment from 'moment-timezone';
import { Day } from 'src/app/_models/authorization/day';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent implements OnInit {
  today: Date = new Date();
  daysCurrentMonth: Array<Day>;
  month: string;
  monthIndex: number;
  year: number;
  events: Array<Event> = [];
  eventsThisMonth: Array<Event> = [];

  constructor(public clanederService: CalenderService) {}

  ngOnInit(): void {
    const today = this.today;
    this.daysCurrentMonth = this.clanederService.getDaysInMonth(
      today.getMonth() + 1,
      today.getFullYear()
    );
    this.month = this.clanederService.monthNames[today.getMonth()];
    this.monthIndex = today.getMonth();
    this.year = today.getFullYear();
    this.clanederService.getCalenderEvents(8).subscribe(events => {
      this.events = events;
      const eventCurrentMonth: Array<Event> = []
      for (const event of events) {
        const date = moment(event.DTSTART);
        if(date.month() == this.monthIndex){
          eventCurrentMonth.push(event);
        }
      }
      this.eventsThisMonth = eventCurrentMonth;
    })
  }


  createArray(length: number) {
    return new Array(length);
  }

  setMonth(dir: 'prev' | 'next') {
    const monthIndex = this.clanederService.getMonthIndex(dir, this.monthIndex);
    let year = this.year
    if(monthIndex == 0 && this.monthIndex == 11) {
      year = year + 1;
    } else if(monthIndex == 11 && this.monthIndex == 0) {
      year = year - 1;
    }

    this.daysCurrentMonth = this.clanederService.getDaysInMonth(
      monthIndex + 1,
      year
    );
    this.month = this.clanederService.monthNames[monthIndex];
    this.monthIndex = monthIndex;
    this.year = year;
    const eventCurrentMonth: Array<Event> = []
      for (const event of this.events) {
        const date = moment(event.DTSTART);
        if(date.month() == this.monthIndex){
          eventCurrentMonth.push(event);
        }
      }
      this.eventsThisMonth = eventCurrentMonth;
  }

  getEvent(day: Day) {
    return this.eventsThisMonth.find(x => {
      const date = moment(x.DTSTART);
      if(date.date() === day.date && date.month() === day.month - 1 && date.year() === day.year) {
        return x
      }
      return undefined;
    })

  }
}
