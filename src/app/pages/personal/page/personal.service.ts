import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { URLS } from "../../../common/services/server.url";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";

let that;
@Injectable()
export class PersonalService {

  constructor(
    public http:Http,public subjectService : SubjectService){
    that = this;
  }

  public logout():void{
    this.http.post(URLS.user.loginOut,{}).subscribe(res => {
      console.log(res);
      localStorage.removeItem("currentUser");
      this.subjectService.publish(SubjectKey.LOGIN_STAT, null);
    })
  }
  public getuserList():Observable<any>{
      return this.http.get(URLS.center.userlist);
  }
}

