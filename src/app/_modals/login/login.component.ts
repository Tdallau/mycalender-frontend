import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/_services/auth.service';
import LoginRequest from 'src/app/_models/Authorization/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public bsModalRef: BsModalRef) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit(user : {email: string, password: string}) {
    const credentials = new LoginRequest(user.email, user.password);
    this.authService.login(credentials).subscribe(res => {
      if(res.success === false) {
        this.error = res.error;
      } else {
        this.bsModalRef.hide();
      }
    })
  }

}
