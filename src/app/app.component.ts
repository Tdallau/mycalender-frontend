import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Event} from './_models/event';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  constructor(private http: HttpClient) {}
  events: Event[] = []
  ngOnInit(): void {
    this.http.get<Event[]>('https://mycalender.dallau.com/api/calender/data/1').subscribe(events => {
      console.log(events)
      this.events = events;
    })
  }

  printDate(date: string) {
    const convert = moment.tz(date, "Europe/Paris");
    return `${convert.date()}-${convert.month() + 1}-${convert.year()} ${convert.hour()}:${convert.minute()}`;
  }
  
}
