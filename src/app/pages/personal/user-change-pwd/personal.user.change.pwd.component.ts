import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import {URLS} from "../../../common/services/server.url";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector:"user-change-pwd",
  templateUrl:"personal.user.change.pwd.component.html"
})

export class PersonalUserChangePwdComponent{

  validateForm: FormGroup;

  info(contentTpl) {
    this.confirmServ.info({
      okText:'确定',
      content: contentTpl
    });
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }
    this.http.post(URLS.center.changePwd+'?oldPassword='+value.oldPassword+'&newPassword='+value.password+'&newPassword2='+value.newpassword,{}).subscribe(res=>{
      if(res.json().code =='1'){
        this.info(res.json().data);
      }else {
        this.info(res.json().failure);
      }
    })
  };


  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls[ 'newpassword' ].updateValueAndValidity();
    })
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  };


  constructor(public http:Http,public fb: FormBuilder,public confirmServ: NzModalService) {
    this.validateForm = this.fb.group({
      oldPassword            : [ '', [  Validators.required,Validators.minLength(6),Validators.maxLength(16) ] ],
      password            : [ '', [ Validators.required,Validators.minLength(6),Validators.maxLength(16) ] ],
      newpassword: [ '', [ this.passwordConfirmationValidator ] ]
    });
  };

}
