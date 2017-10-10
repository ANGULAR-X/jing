import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserLoginService} from './user-login.service';
import {UserModel} from "../model/user.model";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {Http, RequestOptions} from "@angular/http";
import {URLS} from "../../../common/services/server.url";
import {NzModalService, NzMessageService} from "ng-zorro-antd";
import {SecurityModal} from "../model/security.modal";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

let that;

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html'
})

export class UserLoginComponent implements OnInit {
  currentModal;
  validateForm: FormGroup;
  validatePwdForm: FormGroup;
  isVisibleSecurity: boolean;
  isVisibleForget: boolean;
  isVisiblePwd: boolean;
  public config = {
    animated: false,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    show: true
  };
  public userModel: UserModel = new UserModel();
  public securityModal: SecurityModal = new SecurityModal();
  public imgcode: string;
  public error: Error;

  constructor(public router: Router,
              public http: Http,
              public userLoginService: UserLoginService,
              public subjectService: SubjectService,
              public nzModalService: NzModalService,
              public fb: FormBuilder,
              public message: NzMessageService) {
    that = this;
    this.isVisibleForget = false;
    this.isVisibleSecurity = false;
    this.isVisiblePwd = false;
    this.userModel.validateStatus = false;
    this.securityModal.mobilePhone = '';
    this.securityModal.isLoading = false;
    this.getVerificationCode();
    this.validateForm = this.fb.group({
      mobile: ['', [Validators.required]],
      verificationCode: ['', [Validators.required, Validators.pattern('\\d{6}')]]
    });
    this.validatePwdForm = this.fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      onepassword: ['', [this.passwordConfirmationValidator]]
    })
    this.subjectService.getObservable(SubjectKey.VERIFICATIONCODE).subscribe(res => {
      this.imgcode = res;
    })
  }

  ngOnInit() {

  }

  /**
   * 登录
   * @param template
   */
  public doLogin(title: any, content: any, footer: any) {
    this.userLoginService.login(this.userModel).subscribe(res => {
      if (res.json().code == 1) {
        localStorage.setItem("currentUser", JSON.stringify(res.json().data));
        localStorage.setItem('accessToken', res.json().data.accessToken);
        this.showModalForTemplate(title, content, footer);
      } else {
        this.message.create('error', res.json().failure);
        this.getVerificationCode();
      }

    })
  }

  public getVerificationCode(): void {
    let options = new RequestOptions({responseType: 3});
    this.http.get(URLS.user.imgCode, options).subscribe(res => {
      let reader = new FileReader();
      reader.readAsDataURL(res.blob());
      reader.onloadend = function () {
        //消息推送
        that.subjectService.publish(SubjectKey.VERIFICATIONCODE, reader.result);
      };
      let headers = res.headers;
      if (headers.get('Data')) {
        this.userModel.uuid = headers.get('Data');
      }
    });
  }

  /**
   * 弹出密保验证窗口
   * @param titleTpl
   * @param contentTpl
   * @param footerTpl
   */
  public showModalForTemplate(titleTpl, contentTpl, footerTpl) {
    this.currentModal = null;
    this.currentModal = this.nzModalService.open({
      title: titleTpl,
      content: contentTpl,
      footer: footerTpl,
      width: 450,
      maskClosable: false
    });
  }

  /**
   * 密保验证
   */
  public validateSecurity() {
    this.userModel.validateStatus = true;
    this.userLoginService.validateSecurity(this.userModel.answer).subscribe(res => {
      if (res.json().code == 1) {
        this.userModel.errorSecurity = '';
        this.userModel.validateStatus = false;
        localStorage.setItem('accessToken', res.json().data);
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        that.subjectService.publish(SubjectKey.LOGIN_STAT, currentUser);
        this.currentModal.destroy('onOk');
        this.currentModal = null;
      } else {
        this.userModel.errorSecurity = res.json().failure;
      }
    });
  }

  forgetSecurity(titleTpl, contentTpl, footerTpl) {
    this.currentModal.destroy('onOk');
    this.currentModal = null;
    this.currentModal = this.nzModalService.open({
      title: titleTpl,
      content: contentTpl,
      footer: footerTpl,
      width: 450,
      maskClosable: false,
      okText: '下一步'
    });
  }

  valiedateMobile(title: any, content: any, footer: any) {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    this.securityModal.isLoading = true;
    this.userLoginService.validateMobile(this.securityModal.mobilePhone,this.securityModal.verificationCode).subscribe(res => {
      if (res.json().code == 1) {
        this.securityModal.isLoading = true;
        this.showModalForTemplate(title,content,footer);
      }
    })
  }

  public forgetPwd(titleTpl: any, contentTpl: any, footerTpl: any) {
    this.currentModal = this.nzModalService.open({
      title: titleTpl,
      content: contentTpl,
      footer: footerTpl,
      width: 450,
      maskClosable: false,
      okText: '下一步'
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  getPwdFormControl(name) {
    return this.validatePwdForm.controls[name];
  }

  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validatePwdForm.controls['newpassword'].value) {
      return {confirm: true, error: true};
    }
  };

  validateConfirmPassword() {
    setTimeout(_ => {
      this.validatePwdForm.controls['newpassword'].updateValueAndValidity();
    })
  }

  validateMobileCode() {
    setTimeout(_ => {
      this.validateForm.controls['verificationCode'].updateValueAndValidity();
    })
  }

  submitPwdForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validatePwdForm.controls) {
      this.validatePwdForm.controls[key].markAsDirty();
    }
  };
}
