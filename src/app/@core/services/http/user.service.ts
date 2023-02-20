import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
interface IResponse {
  isError?: boolean;
  message?: string;
  data: any
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions = {};
  token: any;
  private domain = environment.baseUrl;
  constructor( private http: HttpClient, private router: Router) { }

  login(data: any): Observable<IResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<IResponse>(this.domain.concat(`Authenticate/userLogin`), data, this.httpOptions)
  }
  getUserData(): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`User/getUser`), { headers })
  }
  addUser(data: any): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(this.domain.concat(`Authenticate/userRegister`), data, { headers })
  }
  // getAllUsers(): Observable<IResponse> {
  //   this.token = localStorage.getItem('token');
  //   if (this.token == null) {
  //     this.token = sessionStorage.getItem('token')?.slice(1, -1);
  //   }
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
  //   return this.http.get<IResponse>(environment.baseUrl.concat(`Admin/GetAllUsers`), { headers })
  // }
  getdepartments(): Observable<IResponse> {
    return this.http.get<IResponse>(environment.baseUrl.concat(`Helper/getAllDepartments`))

  }
  userUpdate(data: any): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(this.domain.concat(`User/updateUser`), data, { headers })
  }
  deleteUser(userName: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/DeleteUser/${userName}`), { headers });

  }
  deactivateUser(userName: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/DeactiveUser/${userName}`), { headers });

  }
  activateUser(userName: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Admin/ActiveUser/${userName}`), { headers });

  }
  userResetPassword(data: any): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(this.domain.concat(`Authenticate/adminResetPassword`), data, { headers })
  }
  userLogout() {
    localStorage.clear();
    sessionStorage.clear();
    console.log("logout")
    this.router.navigate(['/login']);
  }
  userForgetPassword(userName: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Authenticate/forgetPassword/${userName}`), { headers });


  }
  getUsersFilter(pId: number, num: number, filter: string): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.get<IResponse>(environment.baseUrl.concat(`Admin/GetAllUsers?pageNumber=${pId}&recordsPerPage=${num}&searchQuery=${filter}`), { headers })
  }
  changeImage(userName: string, img: any): Observable<IResponse> {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.token = sessionStorage.getItem('token')?.slice(1, -1);
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token).set('Accept', 'application/json');
    return this.http.post<IResponse>(environment.baseUrl.concat(`Authenticate/addPicture/${userName}`), img, { headers });


  }
}