import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { gql } from 'apollo-angular';
import { catchError, delay, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VerifyUserQueryResultInterface, VERIFY_USER_QUERY } from '../graphql/queries';
import { GraphqlService } from '../services/graphql.service';
import { ReportService } from '../services/report.service';

//TODO: CAMBIAR A GRAPHQL
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private graphql: GraphqlService,
    private report: ReportService
  ) { }

  private timer: any = undefined;

  private isAbleToNavigateTo(): Observable<boolean> {
    clearTimeout(this.timer)
    return this.graphql
      .query<VerifyUserQueryResultInterface,never>(
        VERIFY_USER_QUERY
      )
      .pipe(
        catchError((err) => {
          return of(err)
        }),
        map(res => {
          if (res.error || res.errors) {
            this.router.navigate(['auth', 'login'])
            return false;
          }
          this.timer = setTimeout(
            () => {
              this.report.info('Aviso', 'Su sesión ha sido cerrada', true, () => {
                this.router.navigate(['auth', 'login'])
              })
            },
            1000 * 60 * 5 //5 MINUTOS
          )
          return true
        })
      )
  }  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true
    return this.isAbleToNavigateTo()
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true
    return this.isAbleToNavigateTo()
  }
}
