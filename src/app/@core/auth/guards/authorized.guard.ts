import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(private _router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem('token')

    if (token || sessionStorage.getItem('token')) {
      return of(true)
    } else {
      this._router.navigate(['login'])
      return of(false)
    }

  }

}
