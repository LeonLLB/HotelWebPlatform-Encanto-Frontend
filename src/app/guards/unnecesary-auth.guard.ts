import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { VerifyUserQueryResultInterface, VERIFY_USER_QUERY } from '../graphql/queries';
import { GraphqlService } from '../services/graphql.service';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class UnnecesaryAuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private graphql: GraphqlService,private loading: LoadingService) { }

  private isAbleToNavigateTo(): Observable<boolean> {
    this.loading.displayLoading('Espere un momento','dots')
    return this.graphql.query<VerifyUserQueryResultInterface, never>(
      VERIFY_USER_QUERY,undefined,'cache-first'
    )
      .pipe(
        catchError((err) => {
          return of(err)
        }),
        map(res => {
          this.loading.hideLoading()
          if (res.data) {
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
