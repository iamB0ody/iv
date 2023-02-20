import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {
  token: any;
  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = localStorage.getItem('token');
    //       if(this.token==null && )
    // {this.token=sessionStorage.getItem('token')?.slice(1,-1);
    // }

    if (this.token || sessionStorage.getItem('token')) {
      this.router.navigate([''])
      return of(false)
    } else {
      // this.router.navigate(['account/login'])
      return of(true)
    }
  }

}
