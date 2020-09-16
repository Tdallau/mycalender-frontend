import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import LoginRequest from '../_models/Authorization/loginRequest';
import { Calender } from '../_models/calender';
import { CalenderService } from '../_services/calender.service';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  calenders: Array<Calender> = [];
  constructor(private calenderService: CalenderService, private mainService: MainService) { }

  ngOnInit(): void {
    this.calenderService.getAllCalenders().subscribe((calenders) => {
      this.calenders = calenders;
    })
  }

  getUrl(id: number) {
    return this.mainService.sanitize(`webcal://mycalender.dallau.com/api/calender/subscribe/${id}`);
  }

}
