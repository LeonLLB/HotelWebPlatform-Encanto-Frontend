import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidRoles } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleProtectedGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService
  ){

  }

  private canActivateOrLoad(validRoles: ValidRoles[]){
    if(!this.auth.isAuthenticated) {
      this.router.navigate(['auth','login'])
      return false
    }
    return validRoles.includes(this.auth.rol)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(route.data)
      return this.canActivateOrLoad(Object.values(route.data) as ValidRoles[])
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.canActivateOrLoad(route.data as ValidRoles[])
  }
}
