import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import LoginRequest from '../_models/Authorization/loginRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // this.authService.login(new LoginRequest('tim@dallau.com', 'test123')).subscribe(res => {
    //   console.log(res);
    // })
  }

}
