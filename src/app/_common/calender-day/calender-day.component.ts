import { Component, Input, OnInit } from '@angular/core';
import { Time } from 'src/app/_models/time';
import { Event } from '../../_models/event';
import * as moment from 'moment-timezone';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EventEditModalComponent } from 'src/app/_modals/event-edit-modal/event-edit-modal.component';
import { CalenderService } from 'src/app/_services/calender.service';

@Component({
  selector: 'app-calender-day',
  templateUrl: './calender-day.component.html',
  styleUrls: ['./calender-day.component.scss'],
})
export class CalenderDayComponent implements OnInit {
  @Input() date: moment.Moment;
  @Input() event: Event | undefined;
  @Input() isCurrentMonth: boolean;
  @Input() addEvent: (event: Event) => void;
  @Input() removeEvent: (event: Event) => void;
  @Input() updateEvent: (event: Event) => void;

  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService, public calenderService: CalenderService) {}

  ngOnInit(): void {}

  openEditModel() {
    this.bsModalRef = this.modalService.show(EventEditModalComponent, {
      initialState: {
        event: this.event,
        date: this.date
      }
    });
  }

  doNothing() {}

  
}
