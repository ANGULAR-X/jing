import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { UserModel } from "../model/user.model";
import { URLS } from "../../../common/services/server.url";
import { SubjectKey, SubjectService} from "../../../common/services/subject.service";

let that;
@Injectable()
export class UserLoginService {
  public subject: Subject<UserModel> = new Subject<UserModel>();

  constructor(
    public http:Http,public subjectService : SubjectService){
    that = this;
  }

  public get currentUser():Observable<UserModel>{
      return this.subject.asObservable();
  }

  /**
   * 登录系统
   * @param {UserModel} user
   * @returns {Subscription}
   */
  public login(user : UserModel) : Observable<any>{
   return this.http.post(URLS.user.login, user);
  }

  /**
   * 验证密保答案
   * @param {string} security
   * @returns {Observable<any>}
   */
  public validateSecurity(security : string):Observable<any>{
    return this.http.get(URLS.user.security+'?answer='+security);
  }

  /**
   * 验证手机
   * @param {string} mobile
   * @param {string} code
   * @returns {Observable<Response>}
   */
  public validateMobile(mobile:string,code:string){
    return this.http.post(URLS.user.smsVerify,{mobilePhone:mobile,verificationCode:code});
  }

  public logout():void{
    this.http.post(URLS.user.loginOut,{}).subscribe(res => {
      // localStorage.removeItem("currentUser");
      localStorage.clear();
      this.subjectService.publish(SubjectKey.LOGIN_STAT, null);
    })
  }
}

