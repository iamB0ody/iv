import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  userData: any;
  firstName: any;
  isAdmin: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserProfile();
    if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
      this.isAdmin = true;

  }
  getUserProfile() {
    this.userService.getUserData().subscribe((data: any) => {
      this.userData = data.data;
      // this.firstName = this.userData?.firstName;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }

    });

  }

}
