import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { catchError, delay, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportService } from '../services/report.service';

//TODO: CAMBIAR A GRAPHQL
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private http: HttpClient,
    private report: ReportService
  ){}

  private timer: any = undefined;

  private isAbleToNavigateTo(): Observable<boolean>{
    clearTimeout(this.timer)
    return this.http.post<any>('$/users/verify',{})
    .pipe(
      catchError((err)=>{
        return of(err)
      }),
      map(res=>{
        if(res.error){
          this.router.navigate(['auth','login'])
          return false;
        }
        this.timer = setTimeout(
          ()=>{
            this.report.info('Aviso','Su sesión ha sido cerrada',true,()=>{
              this.router.navigate(['auth','login'])
            })
          },
          1000*60*5 //5 MINUTOS
        )
        return true
      })
    )    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAbleToNavigateTo()
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAbleToNavigateTo()
  }
}
