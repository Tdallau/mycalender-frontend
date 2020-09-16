import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/_modals/login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  bsModalRef: BsModalRef;
  public token: string;

  constructor(private authService: AuthService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.authService.$tokenObservable.subscribe(tokenSettings => {
      if(tokenSettings) {
        this.token = tokenSettings.jwtToken
      } else {
        this.token = null
      }
    })
  }

  openLoginModal() {
    this.bsModalRef = this.modalService.show(LoginComponent);
  }

}
