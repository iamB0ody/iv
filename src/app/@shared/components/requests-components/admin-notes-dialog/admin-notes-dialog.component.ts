import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';

@Component({
  selector: 'app-admin-notes-dialog',
  templateUrl: './admin-notes-dialog.component.html',
  styleUrls: ['./admin-notes-dialog.component.scss'],
   providers: [MessageService]
})
export class AdminNotesDialogComponent implements OnInit {
  public notesForm!: FormGroup;
  id!: number;
  constructor(private messageService: MessageService,private userService: UserService, private requestService: RequestService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>, private fb: FormBuilder) {
    this.notesForm = fb.group({
      Notes: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
    this.id = this.data.id;
  }
  sendNotes() {
    this.requestService.requestPending(this.notesForm.value, this.id).subscribe((data: any) => {
    

      
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

