import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';
import { AdAddAuthorizeDialogComponent } from '../ad-add-authorize-dialog/ad-add-authorize-dialog.component';
import { UserAskDialogComponent } from '../user-ask-dialog/user-ask-dialog.component';

@Component({
  selector: 'app-admin-add-authorize',
  templateUrl: './admin-add-authorize.component.html',
  styleUrls: ['./admin-add-authorize.component.scss'],
  providers: [MessageService]
})
export class AdminAddAuthorizeComponent implements OnInit {
  allReports: any;
  loaded: boolean = false;
  shToast: boolean = false;
  isEmpty:boolean=false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any[] = ['id', 'tCode', 'description', 'ask'];
  dataSource = new MatTableDataSource();
  totalLength = 0;
  userId: any;
  fullName!:any;
  constructor(private messageService: MessageService,private fb: FormBuilder, private reportService: ReportService, private dialog: MatDialog, private requestService: RequestService, private userService: UserService) { }
  filterForm = this.fb.group({
    Filter: ['', [Validators.required]]
  });
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    this.fullName= localStorage.getItem('user-name')
    this.getInitialReports(1,25, "");
  }
  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.getReports())
      )
      .subscribe();
  }
  getInitialReports(index: number, num: number, filter: string) {
    this.isEmpty=false;
    this.reportService.getReportsToAskFilter(index, num, filter, { UserId: this.userId }).subscribe((data: any) => {
      this.dataSource.data = data.data.allReports;
      this.totalLength = this.dataSource.data.length;
      if(this.totalLength==0)
      this.isEmpty=true
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
  }
  getReports() {
    this.isEmpty=false
    this.reportService.getReportsToAskFilter(this.paginator.pageIndex + 1,
      this.paginator.pageSize, "", { UserId: this.userId }).subscribe((data: any) => {
        this.dataSource.data = data.data.allReports;
        this.totalLength = this.dataSource.data.length;
        if(this.totalLength==0)
        this.isEmpty=true
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
      const limit = 25;
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
    const dialogRef = this.dialog.open(AdAddAuthorizeDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 'succes') {
        this.messageService.add({severity:'success', summary:'Succes message', detail:'Added Succesfully'});
      }

      else {
        this.messageService.add({severity:'info', summary:'Info message', detail:'Not Added'});
      }

      this.getInitialReports(1, 25, "");
    });
  }

}


