import { Component, Input } from '@angular/core';
import {Http} from "@angular/http";
import {URLS} from "../../services/server.url";
import {NzMessageService} from 'ng-zorro-antd';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";

let that;

@Component({
  selector: 'mobile-code',
  templateUrl: './mobile.code.component.html'
})

export class MobileCodeComponent {
  @Input() mobile;
  public timer : any;
  public timeout : number;
  public timeCount : number;
  public textInput : string;
  public className : string;
  public showTimer : boolean;
  public subscription: Subscription;
  constructor(public http : Http,public message: NzMessageService) {
    this.textInput = '获取手机验证码';
    this.timeout = 6000;
    this.timeCount = 6;
    this.showTimer = false;
    this.timer = TimerObservable.create(0,1000).take(6);
    that = this;
  }

  initMobileCode () {
    that.textInput = '获取手机验证码';
    that.cancelCountdownTimer();
    that.showTimer = false;
    that.timeCount = 6;
  }

  startCountdownTimer(): void {
    this.subscription = this.timer.subscribe(() =>{
      this.timeCount--;
    })
  }

  cancelCountdownTimer(): void {
    this.subscription.unsubscribe();
  }

  public getMobileCode () {
    if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.mobile)) {
      return;
    }

    this.startCountdownTimer();

    this.className = 'btn-org';
    this.showTimer = true;
    this.textInput = '秒后重新获取';



    this.className = 'btn-gary';
    setTimeout(this.initMobileCode,this.timeout);

    this.http.get(URLS.user.mobileCodeVerify+"?mobilePhone="+this.mobile).subscribe(res => {
      if (res.json().code == 1) {
        console.log('短信验证码发送成功');
      } else {
        this.initMobileCode();
        this.message.create('error',res.json().failure);
      }
    })
  }
}
