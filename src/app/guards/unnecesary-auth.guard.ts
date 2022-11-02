import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { catchError, delay, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

//TODO: CAMBIAR A GRAPHQL
@Injectable({
  providedIn: 'root'
})
export class UnnecesaryAuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private http: HttpClient){}
  
  private isAbleToNavigateTo(): Observable<boolean>{
    return this.http.post<any>('$/users/verify',{},{withCredentials:true})
    .pipe(
      catchError((err)=>{
        return of(err)
      }),
      map(res=>{
        if(res.data){
          this.router.navigate(['main'])
          return false;
        }
        return true
      }),
    ) 
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true
      return this.isAbleToNavigateTo()
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true
      return this.isAbleToNavigateTo()
  }
}
