import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() events: Array<Event> = [];
  @Output() eventsChanged = new EventEmitter<Array<Event>>();

  today: Date = new Date();
  daysCurrentMonth: Array<Day>;
  month: string;
  monthIndex: number;
  year: number;
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
    const eventCurrentMonth: Array<Event> = [];
      for (const event of this.events) {
        const date = moment(event.DTSTART);
        if(date.month() == this.monthIndex){
          eventCurrentMonth.push(event);
        }
      }
      this.eventsThisMonth = eventCurrentMonth;
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


  addEvent = (event: Event) => {
    this.events.push(event);
    this.eventsThisMonth.push(event);
    this.eventsChanged.emit(this.events);
  }

  updateEvent = (event: Event) => {
    const eventIndex = this.events.findIndex(x => x.UID === event.UID);
    if(eventIndex === -1) {
      console.log('update')
      return;
    }
    this.events[eventIndex] === event;
    const eventThisMonthIndex = this.eventsThisMonth.findIndex(x => x.UID === event.UID);
    if(eventThisMonthIndex !== -1) {
      this.eventsThisMonth[eventThisMonthIndex] = event;
      this.eventsChanged.emit(this.events);
    }
  }

  deleteEvent = (event: Event) => {
    const eventIndex = this.events.findIndex(x => x.UID === event.UID);
    if(eventIndex === -1) {
      alert('event not found')
      return;
    }
    this.events.splice(eventIndex, 1);
    const eventThisMonthIndex = this.eventsThisMonth.findIndex(x => x.UID === event.UID);
    if(eventThisMonthIndex !== -1) {
      this.eventsThisMonth.splice(eventThisMonthIndex, 1);
      this.eventsChanged.emit(this.events);
    }
  }
}
