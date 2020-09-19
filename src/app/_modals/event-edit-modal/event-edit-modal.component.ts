import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/_models/event';
import * as moment from 'moment-timezone';
import { CalenderService } from 'src/app/_services/calender.service';

@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html',
  styleUrls: ['./event-edit-modal.component.scss']
})
export class EventEditModalComponent implements OnInit {
  event: Event;
  date: moment.Moment;
  startMoment: moment.Moment;
  endMoment: moment.Moment;

  constructor(public calenderService: CalenderService) { }

  ngOnInit(): void {
    if(this.event === undefined) {
      this.event = {
        DTSTAMP: moment().toISOString(),
        DTEND: this.date.toISOString(),
        DTSTART: this.date.toISOString(),
        LOCATION: '',
        SUMMARY: '',
        DESCRIPTION: '',
      }
    }
    this.startMoment = moment(this.event.DTSTART);
    if(this.event.DURATION !== undefined && this.event.DURATION !== null) {
      const dur = this.calenderService.getDuration(this.event.DURATION);
      const start = moment(this.event.DTSTART);
      const end = start.add(dur.hours,'hours')
      this.endMoment = end.add(dur.minutes, 'minutes');

    } else {
      this.endMoment = moment(this.event.DTEND);
    }
    
  }

}
