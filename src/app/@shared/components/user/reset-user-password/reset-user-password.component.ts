import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/@core/services/http/user.service';
import { PasswordStrengthValidator } from 'src/app/@shared/pipes/password-strength.validators';

@Component({
  selector: 'app-reset-user-password',
  templateUrl: './reset-user-password.component.html',
  styleUrls: ['./reset-user-password.component.scss'],
  providers: [MessageService]
})
export class ResetUserPasswordComponent implements OnInit {
  shToast: boolean = false;
  constructor(private messageService: MessageService,private fb: FormBuilder, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>) { }
  resetForm = this.fb.group({
    Username: ['', []],
    NewPassword: ['', [Validators.required, PasswordStrengthValidator]],
    ConfirmNewPassword: ['', [Validators.required, PasswordStrengthValidator]]
  });
  get username() {
    return this.resetForm.get('Username');
  }
  get newPassword() {
    return this.resetForm.get('NewPassword');
  }
  get confirmNewPassword() {
    return this.resetForm.get('ConfirmNewPassword');
  }
  ngOnInit(): void {
    this.resetForm.patchValue({
      Username: this.data.userName,
    });
  }
  submit(): void {
    this.userService.userResetPassword(this.resetForm.value).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
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
