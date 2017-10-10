import {Component, OnInit, Input, TemplateRef} from '@angular/core';
import {TipsTemplateService} from "../../common/services/tips.template.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  constructor(tipsTemplateService: TipsTemplateService) {
    let data = JSON.parse(localStorage.getItem('currentQuery'));
    data = data || null;
    if (!data) return;
    if (data.isTodayFirstLogin) {
      tipsTemplateService.showModalForComponent();
    }
  }
}
