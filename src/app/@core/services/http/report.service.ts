import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
interface IResponse {
  isError?: boolean;
  message?: string;
  data: any
}
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private httpOptions = {};
  private domain = environment.baseUrl;
  token: any;
  reportData:any;
  constructor(private http: HttpClient) { }
  getFavoriteReports(pgNum:number): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
      return this.http.get<IResponse>(environment.baseUrl.concat(`Admin/getAllReports?pageNumber=${pgNum}&recordsPerPage=${12}&searchQuery=${''}`), { headers });
    else
      return this.http.get<IResponse>(environment.baseUrl.concat(`User/getUserFavoriteReports?pageNumber=${pgNum}&recordsPerPage=${12}&searchQuery=${''}`), { headers });
  }
  /////////////////////////////////////////////////////////////////////////////
  getAllReports(pgNum:number): Observable<IResponse> {
    // this.token = localStorage.getItem('token');
    // if (this.token == null) {
    //   this.token = sessionStorage.getItem('token')?.slice(1, -1);
    // }
    // const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    // if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
    //   return this.http.get<IResponse>(environment.baseUrl.concat(`Admin/GetAllReports`), { headers });
    // else
    //   return this.http.get<IResponse>(environment.baseUrl.concat(`User/getUserReports`), { headers });
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
      return this.http.get<IResponse>(environment.baseUrl.concat(`Admin/getAllReports?pageNumber=${pgNum}&recordsPerPage=${12}&searchQuery=${''}`), { headers });
    else
      return this.http.get<IResponse>(environment.baseUrl.concat(`User/getUserReports?pageNumber=${pgNum}&recordsPerPage=${12}&searchQuery=${''}`), { headers });
  }
  getAllReportsFilter(pId: number, num: number, filter: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
      return this.http.get<IResponse>(environment.baseUrl.concat(`Admin/getAllReports?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), { headers });
    else
      return this.http.get<IResponse>(environment.baseUrl.concat(`User/getUserReports?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), { headers });
  }
  /////////////////////////////////////////////////////////////////
  getSelectedReport(repCode: string): Observable<IResponse> {
    return this.http.get<IResponse>(environment.baseUrl.concat(`${repCode}`),)
  }
  /////////////////////////////////////////////////////////////////
  getReportResult(repCode: string, pgNumber: number, objPerPage: number, body: []): Observable<IResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json',
    });
    return this.http.post<IResponse>(environment.baseUrl.concat(`${repCode}` + `?pageNumber=${pgNumber}` + `&` + `objectsPerPage=${objPerPage}`), body, this.httpOptions)

  }
  /////////////////////////////////////////////////////////////////
  getdropDownValues(techName: string): Observable<IResponse> {
    return this.http.get<IResponse>(environment.baseUrl.concat(`Helper/getDropDownData/${techName}`))

  }
  ///////////////////////////////////////////////////////////////////////
  
  getReportsFilter(pId: number, num: number, filter: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`User/getUserReportRequests?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), { headers })
  }
  getReportsToAskFilter(pId: number, num: number, filter: string, body: {}): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Helper/getAllReports?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), body, { headers })
  }
  addToFavorite(id: number): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`User/addFavoriteReport/${id}`), {}, { headers })

  }
  removeFromFavorite(id: number): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`User/removeFavoriteReport/${id}`), {}, { headers })

  }
  removeReport(body: {}): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/RemoveUserReport`), body, { headers });

  }
  getReportsToUser(pId: number, num: number, filter: string, body: {}): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/GetAllReportsByUser?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), body, { headers })
  }
  addLayout( body: {}): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Report/addUserReportLayout`), body, { headers })}
    deleteLayout( layId:any): Observable<IResponse> {
      this.token = localStorage.getItem('token');
      if (this.token == null) {
        this.token = sessionStorage.getItem('token')?.slice(1, -1);
      }
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
      return this.http.post<IResponse>(environment.baseUrl.concat(`Report/deleteLayout/${layId}`),{},{ headers })}
  getLayouts(ReportId: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`Report/getAllUserReportLayouts/${ReportId}`), { headers })
  }
  getSelectedLayout(layoutId: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`Report/getUserReportLayout/${layoutId}`), { headers })
  }
  updateLayout(body: {}): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Report/changeUserReportLayout`),body,{ headers })
  }
  // ***************************New Genration*************************************
  // getInputHistoryValues
  getInputHistoryValues(technicalName: string, ReportName: Number): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Helper/getInputHistoryValues`), { technicalName, ReportName }, { headers })
  }
  // Get selection criteria
  GetSelectionCriteria(ReportId: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`/${ReportId}`), { headers })
  }
  // Post selection history
  PostSelectionHistory(historyFormatedData: any): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Helper/addInputHistoryValues`), historyFormatedData, { headers })
  }
  // execute report 
  executeReport(body: any, pageNumber: number, objectsPerPage: number, reportName: any): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`${reportName}?pageNumber=${pageNumber}&objectsPerPage=${objectsPerPage}`), body, { headers })
  }
  // To get help button
  GetHelpButton(techName: any): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`Helper/getSelectionInputHelperData/${techName}`), { headers })
  }
  // executeReportToExcel(body: any, reportName: any): Observable<IResponse> {
  //   this.token = localStorage.getItem('token');
  //   if (this.token == null) {
  //     this.token = sessionStorage.getItem('token')?.slice(1, -1);
  //   }
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
  //   return this.http.post<IResponse>(environment.baseUrl.concat(`ExportExcelReport/GetLogsPdfORExcel?reportName=${reportName}`), body, { headers })
  // }
}
