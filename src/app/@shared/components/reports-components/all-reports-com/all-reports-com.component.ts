import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-all-reports-com',
  templateUrl: './all-reports-com.component.html',
  styleUrls: ['./all-reports-com.component.scss'],
  providers: [MessageService]
})
export class AllReportsComComponent implements OnInit {
  loaded: boolean = false;
  allReports: any = [];
  userName?: string;
  logTime: any;
  logDate: any;
  dates: any[] = [];
  userReports: any[] = [];
  isAdmin: boolean = false;
  isEmpty:boolean=false;
  total:number=0;
  constructor(private messageService: MessageService, private router: Router, private reportService: ReportService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUserReports(1);
    this.getUserInfo();
    this.logTime = localStorage.getItem('logTime')
    if (!this.logTime)
      this.logTime = sessionStorage.getItem('logTime')?.slice(1, -1);
    this.logDate = localStorage.getItem('logDate');
    if (!this.logDate)
      this.logDate = sessionStorage.getItem('logDate')?.slice(1, -1);

  }
  goToReport() {
    this.router.navigate(['selection-criteria'])
  }
  getAllUserReports(pageNum:number) {
    this.allReports = [];
    this.userReports = [];
    this.reportService.getAllReports(pageNum).subscribe((data: any) => {
      if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin') {
        this.allReports = data.data.allReports;
        this.total=data.data.totalLength;
        this.isAdmin = true;
      }
      else
      { this.total=data.data.totalLength;
         for (let i = 0; i < data.data.userReports.length; i++) {
          this.userReports.push(data.data.userReports[i]);
          this.allReports.push(data.data.userReports[i].report);
          this.dates.push(data.data.userReports[i].lastRunDate)
        }}
      
        if(this.allReports.length===0)
        this.isEmpty=true
        else
        this.isEmpty=false
      this.loaded = true;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }

  getUserInfo() {
    this.userService.getUserData().subscribe((data: any) => {
      this.userName = data.data.userName;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  addToFav(id: number) {
    this.reportService.addToFavorite(id).subscribe((data: any) => {
      this.getAllUserReports(1);
      this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});
      
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }
  removeFav(id: number) {
    this.reportService.removeFromFavorite(id).subscribe((data: any) => {
      this.messageService.add({severity:'info', summary:'Info message', detail:data.message});
      this.getAllUserReports(1);

    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });


  }
  paginate(event: any)
  {
    this.getAllUserReports(event.page + 1);
  }
}
