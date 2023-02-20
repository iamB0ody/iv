import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-admin-reason-dialog',
  templateUrl: './admin-reason-dialog.component.html',
  styleUrls: ['./admin-reason-dialog.component.scss'],
  providers: [MessageService]
})
export class AdminReasonDialogComponent implements OnInit {
  public reasonForm!: FormGroup;
  id!: number;
  constructor(private messageService: MessageService,private userService: UserService, private requestService: RequestService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>, private fb: FormBuilder) {
    this.reasonForm = fb.group({
      Reason: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.id = this.data.id;
  }
  sendReason() {
    this.requestService.requestRejection(this.reasonForm.value, this.id).subscribe((data: any) => {
      
      this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});
      setTimeout(() => {
        this.dialogRef.close(this.id);
      }, 800);


    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else {
        this.messageService.add({severity:'error', summary:'Error message', detail:err.error.message});
      }

    });




  }
  close() {
    this.dialogRef.close();
  }
}

