import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/@core/services/http/user.service';
import { UsernameValidator } from '../../../pipes/username.validator';
import { PasswordStrengthValidator } from "../../../pipes/password-strength.validators"
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {
  allUsers: any = [];
  departments: any;
  deptId!: number;
  constructor(private messageService: MessageService,private fb: FormBuilder,private router: Router, private userService: UserService) {
  }
  addForm = this.fb.group({
    Username: ['', [Validators.pattern("[^' ']+"),Validators.required, Validators.maxLength(12)]],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, PasswordStrengthValidator]],
    FirstName: ['', [Validators.required]],
    LastName: ['', [Validators.required]],
    DepartmentId: ['', [Validators.required]],
    PhoneNumber: ['', []],
  });
  // Validators.pattern("(01)[0-9 ]{9}")
  get username() {
    return this.addForm.get('Username');
  }
  get email() {
    return this.addForm.get('Email');
  }
  get password() {
    return this.addForm.get('Password');
  }
  get firstName() {
    return this.addForm.get('FirstName');
  }
  get lastName() {
    return this.addForm.get('LastName');
  }
  get departmentId() {
    return this.addForm.get('DepartmentId');
  }
  // get isActive() {
  //   return true;
  // }
  get phoneNumber() {
    return this.addForm.get('PhoneNumber');
  }




  ngOnInit(): void {

    // this.getUsers();
    this.getdeparts();

  }
  submit(): void {
    this.userService.addUser(this.addForm.value).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});
setTimeout(() => {
  this.router.navigate(['/all-users']);
}, 800);
      // this.getUsers();
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
    
        this.messageService.add({severity:'error', summary:'Error message', detail:err.error.message});
        

    });
  }

  // getUsers() {
  //   this.userService.getAllUsers().subscribe((data: any) => {
  //     this.allUsers = data.data;
  //   }, (err: any) => {
  //   });
  // }
  getdeparts() {
    this.userService.getdepartments().subscribe((data: any) => {
      this.departments = data.data;
      // this.addForm.patchValue({
      //   DepartmentId: this.departments[0].id
      // });
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });

  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || ' ').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
}
