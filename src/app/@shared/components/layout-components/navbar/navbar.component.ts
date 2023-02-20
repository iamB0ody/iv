import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/@core/services/http/notification.service';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  notifications: any[] = [];
  userName?: any;
  count!: number;
  userPhoto!: string;
  isAdmin: boolean = false;
  allReports:any;
  userReports:any;
  repCount:number=0;
  constructor(private reportService:ReportService,private notifyService: NotificationService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
   this.getReports('');
    this.getUserUnReadNotification();
    this.getUserInfo();
    if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
      this.isAdmin = true;
  }
  getUserUnReadNotification() {

    this.notifyService.getUnReadNotification(true).subscribe((data: any) => {
      this.notifications = data.data;
      this.count = this.notifications?.length;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }
  getUserInfo() {
    this.userService.getUserData().subscribe((data: any) => {
      this.userName = data.data.firstName;
      this.userPhoto = data.data.photo;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  openRequestPage() {
    if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
      this.router.navigate(['/respond-authorize'])
    else
      this.router.navigate(['/user-requests']);
  }

  readNotification(nId: number) {

    this.notifyService.readNotification(nId).subscribe((data: any) => {
      this.getUserUnReadNotification();
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }
 getReports(searchVal:any)
 {
    this.allReports = [];
    this.userReports = [];
    this.reportService.getAllReportsFilter(0,10,searchVal.value).subscribe((data: any) => {
      if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin') {
        this.allReports = data.data.allReports;
        this.isAdmin = true;
       
      }
      else
      {     
      
         for (let i = 0; i < data.data.userReports.length; i++) {
          // this.userReports.push(data.data.userReports[i]);
          this.allReports.push(data.data.userReports[i].report);
        }}
       
        this.repCount= this.allReports.length;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  
 }
}
