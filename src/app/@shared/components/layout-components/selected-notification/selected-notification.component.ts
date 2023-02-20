import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NotificationService } from 'src/app/@core/services/http/notification.service';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';
import { AdminRespondDialogComponent } from '../../requests-components/admin-respond-dialog/admin-respond-dialog.component';
import { ResetUserPasswordComponent } from '../../user/reset-user-password/reset-user-password.component';

@Component({
  selector: 'app-selected-notification',
  templateUrl: './selected-notification.component.html',
  styleUrls: ['./selected-notification.component.scss']
})
export class SelectedNotificationComponent implements OnInit {
  notification: any;
  id!: number;
  ShProceed: boolean = true;
  constructor(private requestService: RequestService, private dialog: MatDialog, private userService: UserService, private notifyService: NotificationService, public activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get("id"));
      this.getUserUnReadNotification(this.id)
    });
  }

  ngOnInit(): void {
  }
  getUserUnReadNotification(id: number) {

    this.notifyService.getNotification(id).subscribe((data: any) => {
      this.notification = data.data;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }
  resetDialog(userName: string): void {

    const dialogRef = this.dialog.open(ResetUserPasswordComponent, {
      data: { userName: userName }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }
  openDialog(): void {
    this.ShProceed = false;
    this.requestService.getUserSelectedObject({
      UserId: this.notification?.senderId,
      ReportId: this.notification?.objectId
    }).subscribe((data: any) => {
      const dialogRef = this.dialog.open(AdminRespondDialogComponent, {
        data: { objects: data.data[0] }
      });

      dialogRef.afterClosed().subscribe((result: any) => {

      });
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });



  }
}
