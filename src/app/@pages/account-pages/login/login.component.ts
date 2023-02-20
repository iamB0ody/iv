import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/@core/services/toaster.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/@core/services/http/user.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  isRemembered: boolean = false;
  userName?: any;
  isload: boolean = false;
  constructor(private fb: FormBuilder, private messageService: MessageService,private router: Router, private userService: UserService) {
  }
  loginForm = this.fb.group({
    UserName: ['', [Validators.required]],
    Password: ['', [Validators.required]],
  });
  get username() {
    return this.loginForm.get('UserName');
  }
  get password() {
    return this.loginForm.get('Password');
  }
  ngOnInit(): void {

  }
  submit(): void {
    this.isload = true;
    this.userService.login(this.loginForm.value).subscribe((data: any) => {
      this.isload = false;
      if (this.isRemembered) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('role', data.data.roles[0]);
        localStorage.setItem('expire', data.data.expiration);
        localStorage.setItem('logTime', data.data.time);
        localStorage.setItem('logDate', data.data.date);


      }

      else {
        sessionStorage.setItem('token', JSON.stringify(data.data.token));
        sessionStorage.setItem('role', JSON.stringify(data.data.roles[0]));
        sessionStorage.setItem('expire', JSON.stringify(data.data.expiration));
        sessionStorage.setItem('logTime', JSON.stringify(data.data.time));
        sessionStorage.setItem('logDate', JSON.stringify(data.data.date));


      }

      this.router.navigate(['']);
    }, (err: any) => {
      this.isload = false;
      this.messageService.add({severity:'error', summary:'login message', detail:err.error.message});
    });
    this.router.navigate(['']);

  }
  forgetPassword() {
    this.userName = this.loginForm.get('UserName')?.value;
    this.userService.userForgetPassword(this.userName).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Success Message', detail: data.message});
    }, (err: any) => {
      this.messageService.add({severity:'error', summary:'Error Message', detail: err.error.message});
    });
  }
  userRemember(e: any) {
    if (e.target.checked) {
      this.isRemembered = true;
    }
    else {
      this.isRemembered = false;
    }
  }


}
