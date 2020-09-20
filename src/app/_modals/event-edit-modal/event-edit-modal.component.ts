import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/_models/event';
import * as moment from 'moment-timezone';
import { CalenderService } from 'src/app/_services/calender.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html',
  styleUrls: ['./event-edit-modal.component.scss']
})
export class EventEditModalComponent implements OnInit {
  eventEditForm: FormGroup;
  error: string;
  event: Event;
  isNewEvent: boolean;
  date: moment.Moment;
  startMoment: moment.Moment;
  endMoment: moment.Moment;
  fullDayEvent: boolean;
  addEvent: (event: Event) => void
  removeEvent: (event: Event) => void
  updateEvent: (event: Event) => void

  constructor(private formBuilder: FormBuilder, public calenderService: CalenderService, public bsModalRef: BsModalRef) {

  }

  uuidv4() {
    // @ts-ignore
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  ngOnInit(): void {
    if(this.event === undefined) {
      this.event = {
        DTSTAMP: moment().toISOString(),
        DTEND: this.date.toISOString(),
        DTSTART: this.date.toISOString(),
        LOCATION: '',
        SUMMARY: '',
        DESCRIPTION: '',
        UID: this.uuidv4()
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
    this.fullDayEvent = this.startMoment.isSame(this.endMoment) || this.startMoment.isSame(this.endMoment.add(1, 'day'));
    this.eventEditForm = this.formBuilder.group({
      name: new FormControl(this.event.SUMMARY),
      location: new FormControl(this.event.LOCATION),
      description: new FormControl(this.event.DESCRIPTION),
      isFulldayEvent: new FormControl(this.fullDayEvent),
      start: new FormControl(this.startMoment),
      end: new FormControl(this.endMoment),
    })
  }

  onSubmit(event : {name: string, location: string, description: string, isFulldayEvent: boolean, start: Date, end?: Date}) {
    let start = moment(event.start);
    let end: moment.Moment;
    if(event.isFulldayEvent) {
      start = start.subtract(start.hour(), 'hours').subtract(start.minutes(), 'minutes');
      end = start.clone();
      end = moment(start).add(1, 'days');
    } else {
      end = moment(event.end)
    }
    const newEvent: Event = {
      DTSTAMP: this.event.DTSTAMP,
      DTSTART: start.toISOString(),
      DTEND: end.toISOString(),
      LOCATION: event.location,
      SUMMARY: event.name,
      DESCRIPTION: event.description,
      UID: this.event.UID
    }
    if(this.isNewEvent) {
      this.addEvent(newEvent);
    } else {
      this.updateEvent(newEvent);
    }
    this.bsModalRef.hide();
  }

  removeThisEvent() {
    this.removeEvent(this.event);
    this.bsModalRef.hide();
  }

}
