import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';
@Component({
  selector: 'app-user-ask-dialog',
  templateUrl: './user-ask-dialog.component.html',
  styleUrls: ['./user-ask-dialog.component.scss']
})
export class UserAskDialogComponent implements OnInit {
  reportObjects: any = [];
  objectsArray: any = new Array();
  userId: any;
  repId: any;
  count: number = 0;
  sendedObj: {} = {};

  constructor(private userService: UserService, private requestService: RequestService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>) {
    this.repId = data.id;
    this.getUserInfo();
  }
  ngOnInit(): void {

    // this.sendedObj = {

    //   UserId: this.userId,
    //   ReportId: this.repId

    // }


    this.count = this.objectsArray.length;


  }
  getAllObjects() {
    this.requestService.getReportObjects({ UserId: this.userId, ReportId: this.repId }).subscribe((data: any) => {
      this.reportObjects = data.data;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }

  getUserInfo() {
    this.userService.getUserData().subscribe((data: any) => {
      this.userId = data.data.id;
      this.getAllObjects();
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  addToObjectArray(val: any, objVal: any, ev: any) {
    // 
    // if (inp.length > 0) {
    //   obj = {
    //     ReportId: this.data.id,
    //     ObjectId: id,
    //     ObjectValue: inp,
    //     UserId: this.userId
    //   }

    // }
    if (ev.target.checked == true) {
      let obj = {};
      obj = {
        ReportId: this.repId,
        ObjectId: objVal.id,
        ObjectValue: val.value,
        UserId: this.userId,
        IsPriority: false
      }
      this.objectsArray.push(obj);
      this.count = this.objectsArray.length;
    }
    else {
      this.objectsArray.forEach((element: any, index: any) => {
        if (element.ObjectId == val.objectId && element.ObjectValue == val.value) this.objectsArray.splice(index, 1);
      });

      this.count = this.objectsArray.length;

    }

  }
  submit() {
    this.requestService.askForAuthorize(this.objectsArray).subscribe((data: any) => {


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
  close() {
    this.dialogRef.close();
  }
  acceptAll() {
    for (let i = 0; i < this.reportObjects.length; i++)
      for (let j = 0; j < this.reportObjects[i].objectValue.length; j++) {
        {
          let obj = {};
          obj = {
            ReportId: this.repId,
            ObjectId: this.reportObjects[i].id,
            ObjectValue: this.reportObjects[i].objectValue[j].value,
            UserId: this.userId,
            IsPriority: false
          }
          this.objectsArray.push(obj);
        }

      }
    this.submit()

  }
}




