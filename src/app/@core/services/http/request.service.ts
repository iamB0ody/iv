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
export class RequestService {
  private httpOptions = {};
  private domain = environment.baseUrl;
  token: any;
  constructor(private http: HttpClient) { }
  // getRequests(): Observable<IResponse> {
  //   this.token = localStorage.getItem('token');
  //   if (this.token == null) {
  //     this.token = sessionStorage.getItem('token')?.slice(1, -1);
  //   }
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
  //   if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
  //     return this.http.get<IResponse>(environment.baseUrl.concat(`Admin/GetAllRequests`), { headers });
  //   else
  //     return this.http.get<IResponse>(environment.baseUrl.concat(`User/getUserReportRequests?pageNumber=0&recordsPerPage=0&searchQuery=`), { headers });
  // }
  getReportObjects(body: {}): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Helper/getAllAuthorizedObjects`), body, { headers });

  }
  askForAuthorize(body: [{}]): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`User/askForReportAuthorize`), body, { headers });

  }
  addAuthorize(body: [{}]): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/AddReportAuthorizationForUser`), body, { headers });

  }

  respondForAuthorize(body: []): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/changeReportRequestToAccepted`), body, { headers });

  }
  getRequestsFilter(pId: number, num: number, filter: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    if (sessionStorage.getItem('role')?.slice(1, -1) === 'Admin' || localStorage.getItem('role') === 'Admin')
      return this.http.get<IResponse>(environment.baseUrl.concat(`Admin/GetAllRequests?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), { headers });
    else
      return this.http.get<IResponse>(environment.baseUrl.concat(`User/getUserReportRequests?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), { headers });
  }
  /////////////////////////////////////////////////////////////////
  // getdropDownValues(techName: string): Observable<IResponse> {
  //   return this.http.get<IResponse>(environment.baseUrl.concat(`Helper/getDropDownData/${techName}`))

  // }
  requestRejection(body: any, id: number): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/changeReportRequestToRejected/${id}`), body, { headers });

  }
  requestPending(body: any, id: number): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/changeReportRequestToPending/${id}`), body, { headers });

  }
  getUserAuthorizedObjects(body: {}): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/GetAllReportObjectsByUser`), body, { headers });

  }
  getUserSelectedObject(body: {}): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/GetUserRequest`), body, { headers });

  }

}
