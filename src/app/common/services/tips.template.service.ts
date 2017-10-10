import {Injectable} from '@angular/core';
import {FirstLoginComponent} from "../components/first-login/first.login.component";
import {NzModalService} from "ng-zorro-antd";

@Injectable()

export class TipsTemplateService {

  constructor(public modalService: NzModalService) {}

  showModalForComponent () {
    const subscription = this.modalService.open({
      content        : FirstLoginComponent,
      onOk() {
      },
      onCancel() {
        console.log('Click cancel');
      },
      footer         : false
    });
    subscription.subscribe(result => {
      console.log(result);
    })
  }
}


