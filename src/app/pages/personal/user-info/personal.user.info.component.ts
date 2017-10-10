import {Component} from "@angular/core";
import { Http, Response } from '@angular/http';
import { URLS } from "../../../common/services/server.url";

let that;
@Component({
  selector:'personal-user-info',
  templateUrl:'./personal.user.info.component.html'
})
export class PersonalUserInfoComponent{
  public userCenter:any;
  public userInfo:any;
  constructor(
    public http:Http){
    that = this;
  }

  ngOnInit() {
    this.http.get(URLS.center.info).subscribe(res=>{
      if (res.json().code =='1'){
        this.userCenter=res.json().data;
        this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
      }
    })
  }
}
