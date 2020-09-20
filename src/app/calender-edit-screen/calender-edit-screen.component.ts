import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CalenderService } from '../_services/calender.service';
import { Event } from '../_models/event';

@Component({
  selector: 'app-calender-edit-screen',
  templateUrl: './calender-edit-screen.component.html',
  styleUrls: ['./calender-edit-screen.component.scss'],
})
export class CalenderEditScreenComponent implements OnInit {
  events: Array<Event> = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private calenderService: CalenderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.calenderService.getCalenderEvents(params.id).subscribe((events) => {
        this.events = events;
      });
    });
  }

  eventsChanged(events: Array<Event>) {
    this.events = events;
  }

  saveCalender() {
    this.calenderService.createCalender(this.events, 'Feyenoord', 'feyenoord').subscribe(_res => {
    })
  }
  

  goBack() {
    this.location.back();
  }
}
