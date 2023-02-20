import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/@core/services/http/user.service';
import { PasswordStrengthValidator } from 'src/app/@shared/pipes/password-strength.validators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [MessageService]
})
export class EditProfileComponent implements OnInit {
  userData!: any;
  departments!: any;
  
  selectedFiles: any;
  selFiles: any;
  imageFile: any = null;
  pdfFile: any = null;
  conFormData!: FormData;

  constructor(private messageService: MessageService,private userService: UserService, private fb: FormBuilder,private router:Router) {
    this.getdeparts(); this.getUserProfile();
  }

  updateForm = this.fb.group({
    UserName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    DepartmentId: new FormControl('', [Validators.required]),
    PhoneNumber: new FormControl('',[]),
    CurrentPassword: new FormControl('', [Validators.required, PasswordStrengthValidator]),
    ConfirmNewPassword: new FormControl('', [Validators.required, PasswordStrengthValidator]),
    NewPassword: new FormControl('', [Validators.required, PasswordStrengthValidator])
  });
  // Validators.pattern("(01)[0-9 ]{9}")
  get username() {
    return this.updateForm.get('UserName');
  }
  get email() {
    return this.updateForm.get('Email');
  }
  get currentPassword() {
    return this.updateForm.get('CurrentPassword');
  }
  get firstName() {
    return this.updateForm.get('FirstName');
  }
  get lastName() {
    return this.updateForm.get('LastName');
  }
  get departmentId() {
    return this.updateForm.get('DepartmentId');
  }
  get newPassword() {
    return this.updateForm.get('NewPassword');
  }
  get confirmNewPassword() {
    return this.updateForm.get('ConfirmNewPassword');
  }
  get phoneNumber() {
    return this.updateForm.get('PhoneNumber');
  }
  ngOnInit(): void {


  }


  getUserProfile() {
    this.userService.getUserData().subscribe((data: any) => {
      this.userData = data.data;
      this.updateForm.patchValue({
        UserName: this.userData.userName,
        Email: this.userData.email,
        FirstName: this.userData.firstName,
        LastName: this.userData.lastName,
        DepartmentId: this.userData.department.id,
        PhoneNumber: this.userData?.phoneNumber,
      });
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }
  getdeparts() {
    this.userService.getdepartments().subscribe((data: any) => {
      this.departments = data.data;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }
  userUpdate() {
    this.userService.userUpdate(this.updateForm.value).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else {
        this.messageService.add({severity:'error', summary:'Error message', detail:err.error.message});
      }

    });
    setTimeout(() => {
      this.router.navigate(['/user-info']);

    }, 1500);

  }
  fileSelectionChanged(event: Event) {
    this.imageFile = null;
    const element = event.currentTarget as HTMLInputElement;
    this.selFiles = element.files;

    if (this.selFiles[0].type != "application/image" && this.imageFile == null)
      this.imageFile = this.selFiles[0];
    this.conFormData = new FormData();
    this.conFormData.append('Picture', this.imageFile);
    this.userService.changeImage(this.userData.userName, this.conFormData).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});
      this.getUserProfile();
    });


  }
}
