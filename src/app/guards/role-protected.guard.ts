import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleProtectedGuard implements CanActivate, CanLoad {

  private _validRoles: ('R' | 'A' | '')[] = [];

  constructor(
    private router: Router,
    private auth: AuthService
  ){

  }

  private canActivateOrLoad(route: ActivatedRouteSnapshot | Route){
    if(!this.auth.isAuthenticated) {
      this.router.navigate(['auth','login'])
      return false
    }
    console.log(route.data)
    // if() return false
    return true
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivateOrLoad(route)
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivateOrLoad(route)
  }
}
