import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { CoreService } from 'src/app/shared/services/core.service';
import { MessagesService } from '../services/messages.service';
import { SecurityService } from '../services/security.service';
import { SharedService } from '../services/shared.service';
import { TokenService } from '../services/token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    private jwtHelperService: JwtHelperService,
    private coreService: CoreService,
    private securityService: SecurityService,
    private sharedService: SharedService,
    private tokenService: TokenService,
    private messagesService: MessagesService,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.coreService.getTokenLocalStorage();
    
    if (!token) {
      this.router.navigate(['/page-not-authorized']);
      return false;
    }
    
    if (this.jwtHelperService.isTokenExpired(token)) {
      this.sharedService.openSpinner();
      this.tokenService.refresh({
        access_token: token
      }).subscribe({
        next: (resp: any) => {
          this.coreService.setTokenLocalStorage(resp.access_token);
          this.router.navigate([state.url]);
          this.sharedService.closeSpinner();
          this.messagesService.success('Success', 'User logged in successfully!');
          return true;
        },
        error: (error: any) => {
          this.messagesService.errorHandler(error);
          this.securityService.signOut();
          return false;
        }
      });
    }
    return true;
  }
}
