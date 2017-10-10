import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {SubjectKey, SubjectService} from "./subject.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router : Router,public subjectService : SubjectService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // this.subjectService.getObservable(SubjectKey.LOGIN_STAT).distinctUntilChanged().subscribe(data => {
    //   if (data) {
    //     return true;
    //   }
    //   this.router.navigate(['/login']);
    //   return false;
    // },error => {
    //   console.error(error);
    // });
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    console.log(state.url);
    this.router.navigate(['/login']);
    return false;
  }

}
