import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { NotificationService } from 'src/app/@core/services/http/notification.service';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  shToast: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['userName', 'message', 'date', 'type', 'action'];
  dataSource = new MatTableDataSource();
  totalLength = 0;

  constructor(private userService: UserService, private fb: FormBuilder, private dialog: MatDialog, private notifyService: NotificationService) {
  }
  filterForm = this.fb.group({
    Filter: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.getInitialNotifications(1, 10, "");
  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.getNotifications())
      )
      .subscribe();
  }
  getInitialNotifications(index: number, num: number, filter: string) {
    this.notifyService.getNotificationsFilter(index, num, filter).subscribe((data: any) => {
      this.dataSource.data = data.data.allNotifications;
      this.totalLength = data.data.totalLength;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  getNotifications() {
    this.notifyService.getNotificationsFilter(this.paginator.pageIndex + 1,
      this.paginator.pageSize, "").subscribe((data: any) => {
        this.dataSource.data = data.data.allNotifications;
        this.totalLength = data.data.totalLength;
      }, (err: any) => {
        if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
          this.userService.userLogout();
        }
        else { }
      });
  }
  applyFilter(filter: any) {
    this.dataSource.data = [];
    this.totalLength = 0;
    this.notifyService.getNotificationsFilter(0, 0, filter.value).subscribe((data: any) => {
      const limit = 10;
      const skip = 1 * limit;
      this.dataSource.data = data.data.allNotifications;
      this.totalLength = data.data.totalLength;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  readNotification(nId: number) {

    this.notifyService.readNotification(nId).subscribe((data: any) => {
      this.getInitialNotifications(1, 10, "");
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }
}