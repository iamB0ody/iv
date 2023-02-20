import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {
  requestsData: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['report', 'object', 'value', 'periority', 'status'];
  dataSource = new MatTableDataSource();
  totalLength = 0;
  constructor(private fb: FormBuilder, private requestService: RequestService, private userService: UserService) { }
  filterForm = this.fb.group({
    Filter: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.getInitialUserRequests(1, 10, "");
  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.getUserRequests())
      )
      .subscribe();
  }
  getInitialUserRequests(index: number, num: number, filter: string) {

    this.requestService.getRequestsFilter(index, num, filter).subscribe((data: any) => {
      this.dataSource.data = data.data.allUserReportRequests;
      this.totalLength = data.data.totalLength;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  getUserRequests() {
    this.requestService.getRequestsFilter(this.paginator.pageIndex + 1,
      this.paginator.pageSize, "").subscribe((data: any) => {
        this.dataSource.data = data.data.allUserReportRequests;
        this.totalLength = data.data.totalLength;
      }, (err: any) => {
        if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
          this.userService.userLogout();
        }
        else { }
      });
  }
  applyFilter(filter: any) {
    this.totalLength = 0;
    this.requestService.getRequestsFilter(0, 0, filter.value).subscribe((data: any) => {
      const limit = 10;
      const skip = 1 * limit;
      this.dataSource.data = data.data.allUserReportRequests;
      this.totalLength = data.data.totalLength;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
}
