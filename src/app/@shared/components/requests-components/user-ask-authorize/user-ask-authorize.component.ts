import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';
import { UserAskDialogComponent } from '../user-ask-dialog/user-ask-dialog.component';

@Component({
  selector: 'app-user-ask-authorize',
  templateUrl: './user-ask-authorize.component.html',
  styleUrls: ['./user-ask-authorize.component.scss'],
  providers: [MessageService]
})
export class UserAskAuthorizeComponent implements OnInit {
  allReports: any;
  loaded: boolean = false;
  shToast: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any[] = ['id', 'tCode', 'description', 'ask'];
  dataSource = new MatTableDataSource();
  totalLength = 0;
  userId: any;
  isEmpty:boolean=false;
  constructor(private messageService: MessageService, private fb: FormBuilder, private reportService: ReportService, private dialog: MatDialog, private requestService: RequestService, private userService: UserService) { }
  filterForm = this.fb.group({
    Filter: ['', [Validators.required]]
  });
  ngOnInit(): void {
    this.getUserInfo();

  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.getReports())
      )
      .subscribe();
  }
  getInitialReports(index: number, num: number, filter: string) {
    this.reportService.getReportsToAskFilter(index, num, filter, { UserId: this.userId }).subscribe((data: any) => {
      this.dataSource.data = data.data.allReports;
      this.totalLength = this.dataSource.data.length;
      if(this.totalLength===0)
    this.isEmpty=true
    else
    this.isEmpty=false
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  getReports() {
    this.reportService.getReportsToAskFilter(this.paginator.pageIndex + 1,
      this.paginator.pageSize, "", { UserId: this.userId }).subscribe((data: any) => {
        this.dataSource.data = data.data.allReports;
        this.totalLength = this.dataSource.data.length;
        if(this.totalLength===0)
    this.isEmpty=true
    else
    this.isEmpty=false
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
    this.reportService.getReportsToAskFilter(0, 0, filter.value, { UserId: this.userId }).subscribe((data: any) => {
      const limit = 10;
      const skip = 1 * limit;
      this.dataSource.data = data.data.allReports;
      this.totalLength = this.dataSource.data.length;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(UserAskDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.shToast = true;
      if (result == 'succes')
     { this.messageService.add({severity:'success', summary:'Succes message', detail:'Request Added Succefully'});
       this.getInitialReports(1, 10, "");} 
      else

        this.getInitialReports(1, 10, "");
    });
  }
  getUserInfo() {
    this.userService.getUserData().subscribe((data: any) => {
      this.userId = data.data.id;
      this.getInitialReports(1, 10, "");
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
}

