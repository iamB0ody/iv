import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { UserService } from 'src/app/@core/services/http/user.service';
import { ConfirmationDialogComponent } from '../../layout-components/confirmation-dialog/confirmation-dialog.component';
import { AdminAddAuthorizeComponent } from '../../requests-components/admin-add-authorize/admin-add-authorize.component';
import { ResetUserPasswordComponent } from '../reset-user-password/reset-user-password.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
  providers: [MessageService]
})
export class AllUsersComponent implements OnInit {
  shToast: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = ['userName', 'firstName', 'lastName', 'departmentId', 'department', 'auth', 'authRep', 'edit', 'status', 'del'];
  dataSource = new MatTableDataSource();
  totalLength = 0;

  constructor(private fb: FormBuilder, private dialog: MatDialog,private messageService: MessageService,  private userService: UserService) {
  }
  filterForm = this.fb.group({
    Filter: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.getInitialUsers(1, 25, "");
  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.getUsers())
      )
      .subscribe();
  }
  getInitialUsers(index: number, num: number, filter: string) {
    this.userService.getUsersFilter(index, num, filter).subscribe((data: any) => {
      this.dataSource.data = data.data.allUsers;
      this.totalLength = data.data.totalLength;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  getUsers() {
    this.userService.getUsersFilter(this.paginator.pageIndex + 1,
      this.paginator.pageSize, "").subscribe((data: any) => {
        this.dataSource.data = data.data.allUsers;
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
    this.userService.getUsersFilter(0, 0, filter.value).subscribe((data: any) => {
      const limit = 25;
      const skip = 1 * limit;
      this.dataSource.data = data.data.allUsers;
      this.totalLength = data.data.totalLength;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  deleteSelectedUser(userName: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete User',
        confirmationMessage: 'Are you sure delete ' + userName + ' ?',
        close: 'cancel',
        ok: 'delete'
      },
      minWidth: '300px',
      minHeight: '300px'
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(userName).subscribe((data: any) => {
           this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});
          this.getUsers()
        }, (err: any) => {
          if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
            this.userService.userLogout();
          }
          else {
          
            this.messageService.add({severity:'error', summary:'Error message', detail:err.error.message});

        
          }

        });
      }
    });
  }
  activateUser(userName: string) {


    this.userService.activateUser(userName).subscribe((data: any) => {
      this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});

      this.getUsers()
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else {
        
        this.messageService.add({severity:'error', summary:'Error message', detail:err.error.message});

      }

    });
  }
  deactivateUser(userName: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'DeActivate User',
        confirmationMessage: 'Are you sure deActivate ' + userName + ' ?',
        close: 'cancel',
        ok: 'deActivate'
      },
      minWidth: '300px',
      minHeight: '300px'
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res) {

        this.userService.deactivateUser(userName).subscribe((data: any) => {
          this.messageService.add({severity:'success', summary:'Succes message', detail:data.message});

          this.getUsers()
        }, (err: any) => {
          if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
            this.userService.userLogout();
          }
          else {
            this.messageService.add({severity:'error', summary:'Error message', detail:err.error.message});

          }

        });
      }
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
  openDialog(item: any): void {
    const dialogRef = this.dialog.open(AdminAddAuthorizeComponent, {
      data: { objects: item }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }
  setUserId(id: string,fName:string,lName:string) {
    localStorage.setItem("userId", id)
    localStorage.setItem("user-name", fName+" "+lName)
  }
}
