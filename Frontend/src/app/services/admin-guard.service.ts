import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private _router: Router, private _authService: AuthGuardService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    if(localStorage.getItem('token').split(' ')[1] == 'admin'){
      return true;
    }
    else {
      this._router.navigate(['login']);
    }
    
  }
}
