import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';
import { AdminReasonDialogComponent } from '../admin-reason-dialog/admin-reason-dialog.component';

@Component({
  selector: 'app-ad-remove-authorize-dialog',
  templateUrl: './ad-remove-authorize-dialog.component.html',
  styleUrls: ['./ad-remove-authorize-dialog.component.scss']
})
export class AdRemoveAuthorizeDialogComponent implements OnInit {
  reportObjects: any = [];
  objectsArray: any = new Array();
  userId: any;
  shToast: boolean = false;
  repId: any;
  body!: {};
  shAll: boolean = true;
  constructor(private dialog: MatDialog,private userService: UserService, private requestService: RequestService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>) {
    this.repId = data.id;
  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.body = {
      UserId: this.userId,
      ReportId: this.repId
    }
    this.getAllObjects();



  }
  getAllObjects() {
    this.requestService.getUserAuthorizedObjects(this.body).subscribe((data: any) => {
      this.reportObjects = data.data;
      if (data.data.length === 0)
        this.close();
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }


  openRejectDialog(id: number): Observable<any> {

    const dialogRef = this.dialog.open(AdminReasonDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // for (let i = 0; i < this.reportObjects?.length; i++) {
      //   if (this.reportObjects[i].id == id)
      //     delete this.reportObjects[i];
      // }

      this.getAllObjects();

    });
    return dialogRef.afterClosed();



  }

  close() {
    this.dialogRef.close();
  }


}




