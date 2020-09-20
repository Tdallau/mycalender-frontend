import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calender } from '../_models/calender';
import { AuthService } from '../_services/auth.service';
import { CalenderService } from '../_services/calender.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  myCalenders: Array<Calender> = [];

  constructor(private authService: AuthService, private calenderService: CalenderService, private router: Router,) { }

  ngOnInit(): void {
    this.calenderService.getMyCalenders().subscribe((calenders) => {
      this.myCalenders = calenders;
    })
  }

  logout() {
    this.authService.logout();
  }

  navigate(id: number) {
    this.router.navigate([`calender/${id}`]);
  }

}
