import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Calender } from '../_models/calender';
import { ResponseItem } from '../_models/responseType';
import { map } from 'rxjs/operators';
import { Event } from '../_models/event';
import * as moment from 'moment-timezone';
import { Day } from '../_models/authorization/day';
import { Time } from '../_models/time';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  private baseUrl = 'https://mycalender.dallau.com/api/calender/';
  public monthNames = [
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
  public weekDays = [
    'Maandag',
    'Dinsdag',
    'Woensdag',
    'Donderdag',
    'Vrijdag',
    'Zaterdag',
    'Zondag'
  ]
  constructor(private http: HttpClient) { }

  getDaysInMonth(month: number, year: number): Array<Day> {
    const length = new Date(year, month, 0).getDate();
    const days: Array<Day> = [];
    const firstDayOfMonth = this.getMomentDate(1, month, year);
    const prefixLength = firstDayOfMonth.day() < 1 ? 6 : firstDayOfMonth.day() - 1;
    for (let i = prefixLength; i > 0; i--) {
      
      days.push({
        date: new Date(year, month - 1 < 0 ? 11 : month - 1, 0).getDate() + 1- i,
        month: month - 1 < 0 ? 11 : month - 1,
        year,
        isCurrentMonth: false
      })      
    }
    for (let i = 0; i < length; i++) {
      days.push({
        date: i + 1,
        month,
        year,
        isCurrentMonth: true
      })   
    }
    for (let i = 0; i < days.length % 7; i++) {
      days.push({
        date: i + 1,
        month: month + 1,
        year: month + 1 > 11 ? year + 1 : year,
        isCurrentMonth: false
      })   
    }
    return days;
  }

  getMonthIndex(dir: 'prev' | 'next', currentIndex: number): number {
    let newIndex = currentIndex;
    if(dir === 'prev') {
      if(currentIndex - 1 < 0) {
        newIndex = 11
      } else {
        newIndex  = currentIndex - 1
      }

    } else {
      if(currentIndex + 1 > 11) {
        newIndex = 0
      } else {
        newIndex  = currentIndex + 1
      }
    }
    return newIndex;
  }

  getMomentDate(day: number, month: number, year: number) : moment.Moment {
    return moment(`${year}-${this.addLeadingZero(month)}-${this.addLeadingZero(day)}T${this.addLeadingZero(moment().hour() - ((-new Date().getTimezoneOffset()) / 60))}:00:00.000Z`);
  }

  getTime(date: moment.Moment, time: Time) {
    let newHour = date.hour() + time.hours;
    let newMinutes = date.minutes() + time.minutes;
    if (newMinutes >= 60) {
      newHour++;
      newMinutes = newMinutes - 60;
    }
    return `${this.addLeadingZero(newHour)}:${this.addLeadingZero(newMinutes)}`;
  }

  getDuration(DURATION: string) {
    const value = DURATION.replace('PT', '');
    const hourIndex = value.indexOf('H');
    const minuteIndex = value.indexOf('M');

    let durationObject: Time = {};
    if (hourIndex !== -1) {
      if (hourIndex - 2 >= 0) {
        durationObject['hours'] = +value.slice(hourIndex - 2, hourIndex);
      } else {
        durationObject['hours'] = +value.slice(hourIndex - 1, hourIndex);
      }
    }
    if (minuteIndex !== -1) {
      if (minuteIndex - 2 >= 0) {
        durationObject['minutes'] = +value.slice(minuteIndex - 2, minuteIndex);
      } else {
        durationObject['minutes'] = +value.slice(minuteIndex - 1, minuteIndex);
      }
    }
    return durationObject as Time;
  }

  getPeriod(event: Event) {
    if(event.DURATION !== undefined && event.DURATION !== null) {
      const durationObject = this.getDuration(event.DURATION);
      const date = moment(event.DTSTART);
      return `${this.addLeadingZero(date.hour())}:${this.addLeadingZero(date.minutes())} - ${this.getTime(
        date,
        durationObject
      )}`;
    } else {
      const start = moment(event.DTSTART);
      const end = moment(event.DTEND);
      if (
        start.date() === end.date() &&
        start.month() === end.month() &&
        start.year() === end.year()
      ) {
        return `${this.addLeadingZero(start.hour())}:${this.addLeadingZero(start.minutes())} - 
                ${this.addLeadingZero(end.hour())}:${this.addLeadingZero(end.minutes())}`;
      } else {
        return 'Voledige dag';
      }
    }
  }

  addLeadingZero(number: number) {
    return number < 10 ? `0${number}` : `${number}`
  }

  getAllCalenders(): Observable<Array<Calender>> {
    return this.http.get<ResponseItem<Array<Calender>>>(`${this.baseUrl}`).pipe(
      map(result => {
        if(result.success) {
          return result.data
        }
        return [];
      })
    )
  }

  getMyCalenders(): Observable<Array<Calender>> {
    return this.http.get<ResponseItem<Array<Calender>>>(`${this.baseUrl}my`).pipe(
      map(result => {
        if(result.success) {
          return result.data
        }
        return [];
      })
    )
  }

  getCalenderEvents(id: number): Observable<Array<Event>> {
    return this.http.get<Array<Event>>(`${this.baseUrl}data/${id}`);
  }

  createCalender(events: Array<Event>, name: string, fileName: string): Observable<{id: number, name: string, fileName: string}> {
    return this.http.post<{id: number, name: string, fileName: string}>(`${this.baseUrl}json`, {
      events: events.map<Event>(x => ({
        ...x,
      })),
      name,
      fileName
    })
  }
}
