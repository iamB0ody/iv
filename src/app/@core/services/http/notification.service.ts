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
export class NotificationService {
  private httpOptions = {};
  private domain = environment.baseUrl;
  token: any;
  constructor(private http: HttpClient) { }
  getUnReadNotification(isRead: boolean): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    if (localStorage.getItem("role") === "User" || sessionStorage.getItem('role')?.slice(1, -1) === "User")
      return this.http.get<IResponse>(environment.baseUrl.concat(`Notification/getUserNotifications/${isRead}`), { headers })
    else
      return this.http.get<IResponse>(environment.baseUrl.concat(`Notification/getAdminNotifications/${isRead}`), { headers })

  }

  readNotification(id: number): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Notification/readNotification/${id}`), {}, { headers })

  }
  getNotification(id: number): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`Notification/getNotification/${id}`), { headers })

  }
  getNotificationsFilter(pId: number, num: number, filter: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`Notification/getAllNotifications?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), { headers })
  }
}
