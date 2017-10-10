import { Component, OnInit,Input, TemplateRef } from '@angular/core';
import { Router,RouterStateSnapshot, RouterState } from '@angular/router';
import {UserLoginService} from "../../../pages/user/user-login/user-login.service";
import {UserModel} from "../../../pages/user/model/user.model";

@Component({
  selector: 'top-bar',
  templateUrl: './topbar.component.html'
})

export class TopbarComponent {
  public currentUser : any;
  public isShowSearchBox : boolean;

  constructor(public userLoginService : UserLoginService,public router : Router){
  }

  ngOnInit() {
    let routerState: RouterState = this.router.routerState;
    let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
    this.isShowSearchBox = (routerStateSnapshot.url.indexOf("/home") == -1) ? true : false;
    if (JSON.parse(localStorage.getItem("currentUser"))) {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    } else {
      this.currentUser = new UserModel();
    }
  }

  public doLogout():void{
    this.userLoginService.logout();
  }
  public goPersonal():void{
    this.router.navigateByUrl("/personal");
  }


}
