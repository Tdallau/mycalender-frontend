import { Component, OnInit, Input } from '@angular/core';
import { Calender } from 'src/app/_models/calender';
import {DomSanitizer} from '@angular/platform-browser';
import { MainService } from 'src/app/_services/main.service';

@Component({
  selector: 'app-calendar-category-card',
  templateUrl: './calendar-category-card.component.html',
  styleUrls: ['./calendar-category-card.component.scss']
})
export class CalendarCategoryCardComponent implements OnInit {
  @Input() title: string;
  @Input() calenders: Array<Calender>;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  getUrl(id: number) {
    return this.mainService.sanitize(`webcal://mycalender.dallau.com/api/calender/subscribe/${id}`);
  }

  

}
