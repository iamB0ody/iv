import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';
import { AdminNotesDialogComponent } from '../admin-notes-dialog/admin-notes-dialog.component';
import { AdminReasonDialogComponent } from '../admin-reason-dialog/admin-reason-dialog.component';

@Component({
  selector: 'app-admin-respond-dialog',
  templateUrl: './admin-respond-dialog.component.html',
  styleUrls: ['./admin-respond-dialog.component.scss'],
  providers: [MessageService]
})
export class AdminRespondDialogComponent implements OnInit {
  reportObjects: any;
  objectsArray: any = new Array();
  userId!: string;
  sendedId?: number;
  addAll: boolean = true;
  constructor(private messageService: MessageService, private dialog: MatDialog, private userService: UserService, private requestService: RequestService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>) {

  }
  ngOnInit(): void {
    this.reportObjects = this.data.objects;
    // this.reportObjects);console.log(

    // this.getAllObjects();
  }

  addToObjectArray(id: number) {
    this.addAll = false;
    this.objectsArray = [];
    this.objectsArray.push(id);
    this.requestService.respondForAuthorize(this.objectsArray).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Succes message', detail:'Accepted Succefully'});
      for (let i = 0; i < this.reportObjects.length; i++)
        if (this.reportObjects[i].id == id) {
          this.reportObjects.splice(i, 1);
          if (this.reportObjects.length == 0)
            this.dialogRef.close();
        }
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else {




      }

    });

  }
  submit() {
    for (let j = 0; j < this.reportObjects.length; j++) {
      this.objectsArray.push(this.reportObjects[j].id);
    }
    this.requestService.respondForAuthorize(this.objectsArray).subscribe((data: any) => {
      this.dialogRef.close('succes');
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else {

        this.dialogRef.close('error');


      }

    });
  }
  openRejectDialog(id: number): void {
    this.sendedId = id;
    const dialogRef2 = this.dialog.open(AdminReasonDialogComponent, {
      data: { id: id }
    });

    dialogRef2.afterClosed().subscribe((result: any) => {
      if (result) {
        for (let i = 0; i < this.reportObjects.length; i++)
          if (this.reportObjects[i].id == this.sendedId) {
            this.reportObjects.splice(i, 1);
            if (this.reportObjects.length == 0)
              this.dialogRef.close();
          }

      }


    })
  }
  close() {
    this.dialogRef.close();
  }
  openPendDialog(id: number): void {
    this.sendedId = id;
    const dialogRef3 = this.dialog.open(AdminNotesDialogComponent, {
      data: { id: id }
    });

    dialogRef3.afterClosed().subscribe((result: any) => {
      if (result) {
        for (let i = 0; i < this.reportObjects.length; i++)
          if (this.reportObjects[i].id == this.sendedId) {
            this.reportObjects.splice(i, 1);
            if (this.reportObjects.length == 0)
              this.dialogRef.close();
          }

      }


    });

  }
}





