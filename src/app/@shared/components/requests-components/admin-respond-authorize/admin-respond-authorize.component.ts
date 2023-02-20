import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from 'primeng/api';
import { Observable, tap } from 'rxjs';
import { ReportService } from 'src/app/@core/services/http/report.service';
import { RequestService } from 'src/app/@core/services/http/request.service';
import { UserService } from 'src/app/@core/services/http/user.service';
import { AdminReasonDialogComponent } from '../admin-reason-dialog/admin-reason-dialog.component';
import { AdminRespondDialogComponent } from '../admin-respond-dialog/admin-respond-dialog.component';
@Component({
  selector: 'app-admin-respond-authorize',
  templateUrl: './admin-respond-authorize.component.html',
  styleUrls: ['./admin-respond-authorize.component.scss'],
  providers: [MessageService]
})
export class AdminRespondAuthorizeComponent implements OnInit {
  allReports: any;
  loaded: boolean = false;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any[] = ['image', 'userName', 'tCode', 'obj', 'status', 'proceed'];
  dataSource = new MatTableDataSource();
  totalLength = 0;
  isEmpty:boolean=false;
  constructor(private messageService: MessageService,private userService: UserService, private fb: FormBuilder, private reportService: ReportService, private dialog: MatDialog, private requestService: RequestService) { }
  filterForm = this.fb.group({
    Filter: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.getInitialRequestsData(1, 10, "");
  }
  ngAfterViewInit() {
    this.paginator?.page?.pipe(
        tap(() => this.getRequestsData())
      )
      .subscribe();
  }
  getInitialRequestsData(index: number, num: number, filter: string) {
    this.requestService.getRequestsFilter(index, num, filter).subscribe((data: any) => {
      // this.requestsData = 
      const limit = 10;
      const skip = 1 * limit;
      this.dataSource.data = data.data.allRequests;
      this.totalLength = data.data.totalLength;
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
  getRequestsData() {
    this.requestService.getRequestsFilter(this.paginator.pageIndex + 1,
      this.paginator.pageSize, "").subscribe((data: any) => {
        // this.requestsData = 
        const limit = 10;
        const skip = 1 * limit;
        this.dataSource.data = data.data.allRequests;
        this.totalLength = data.data.totalLength;
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

  openDialog(item: any): void {
    const dialogRef = this.dialog.open(AdminRespondDialogComponent, {
      data: { objects: item }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
          if (result == 'succes') {
        this.messageService.add({severity:'success', summary:'Succes message', detail:'Proceeded Succesfully'});
        this.getInitialRequestsData(1, 10, "");
      }
      else

        this.getInitialRequestsData(1, 10, "");
    });
  }
  openRejectDialog(id: number): Observable<any> {
    const dialogRef = this.dialog.open(AdminReasonDialogComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.getInitialRequestsData(1, 10, "");
    });
    return dialogRef.afterClosed();
  }
  applyFilter(filter: any) {
    // this.dataSource.data = [];
    this.totalLength = 0;
    this.requestService.getRequestsFilter(0, 0, filter.value).subscribe((data: any) => {
      const limit = 10;
      const skip = 1 * limit;
      this.dataSource.data = data.data.allRequests;
      this.totalLength = data.data.totalLength;
    }, (err: any) => {
      if (Number(err.status) === 401 || err.statusText == 'Unauthorized') {
        this.userService.userLogout();
      }
      else { }
    });
   
  }
}

