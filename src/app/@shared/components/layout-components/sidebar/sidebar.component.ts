import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [MessageService]
})
export class SidebarComponent implements OnInit {
  isShown: boolean = false;
  isExpanded: boolean = true;
  showSubmenu: boolean = false;
  isShowing: boolean = false;
  showSubSubMenu: boolean = false;
  showSubSubMenu2: boolean = false;
  favReports: any[] = [];
  isFav: boolean = true;
  isAdmin: boolean = false;
  shToast: boolean = false;

  constructor(private userService: UserService, private router: Router,private messageService: MessageService, private reportService: ReportService) {

  }

  ngOnInit(): void {
    this.getFavUserReports()
    if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
      this.isAdmin = true;
  }
  mouseenter() {

    if (!this.isExpanded) {
      this.isShowing = true;

    }
  }

  mouseleave() {

    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  logout() {
    this.messageService.add({severity:'success', summary:'you will logout', detail: 'wait you come back'});
   setTimeout(() => {
     this.userService.userLogout();
   }, 700);
    
   

  }
  gefavorite() {
    this.router.navigate(['/favorite-reports'])
  }
  getFavUserReports() {
    this.favReports = [];
    this.reportService.getFavoriteReports(1).subscribe((data: any) => {
      if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
        this.favReports = data.data.allReports;
      else
        for (let i = 0; i < data.data.userReports.length; i++) {
          this.favReports.push(data.data.userReports[i].report);
        }
      if (this.favReports.length == 0)
        this.isFav = false;
      else
        this.isFav = true;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { this.isFav = false; }

    });

  }
  // openRequestPage() {
  //     this.router.navigate(['/respond-authorize']);
  //   else
  //     this.router.navigate(['/ask-authorize'])
  // }
  openAll() {
    // this.router.navigate(['/all-reports']);
  }
  openFav() {

  }
  
}



