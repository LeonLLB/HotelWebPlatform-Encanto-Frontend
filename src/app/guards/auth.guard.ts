import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { gql } from 'apollo-angular';
import { catchError, delay, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VerifyUserQueryResultInterface, VERIFY_USER_QUERY } from '../graphql/queries';
import { AuthService } from '../services/auth.service';
import { GraphqlService } from '../services/graphql.service';
import { LoadingService } from '../services/loading.service';
import { ReportService } from '../services/report.service';

//TODO: CAMBIAR A GRAPHQL
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private graphql: GraphqlService,
    private auth: AuthService,
    private report: ReportService,
    private loading: LoadingService
  ) { }

  private timer: any = undefined;

  private isAbleToNavigateTo(): Observable<boolean> {
    this.loading.displayLoading('Espere un momento','dots')
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
          this.loading.hideLoading()
          if (res.error || res.errors) {
            this.router.navigate(['auth', 'login'])
            return false;
          }
          this.auth.rol = res.data.revalidate.rol
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
