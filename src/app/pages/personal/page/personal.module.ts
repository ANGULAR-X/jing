import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {PersonalComponent} from "./personal.component";
import {PersonalLeftNavigateComponent} from "../left-navigate/personal.left.navigate.component";
import {SharedModule} from "../../../shared.module";
import {PersonalUserInfoComponent} from "../user-info/personal.user.info.component";
import {PersonalRightDataViewComponent} from "../right-data-view/personal.right.data.view.component";
import {PersonalUserPaylistComponent} from "../user-paylist/personal.user.paylist.component";
import {PersonalUserLogloginComponent} from "../user-loglogin/personal.user.loglogin.component";
import {PersonalUserSearchlogComponent} from "../user-searchlog/personal.user.searchlog.component";
import {PersonalUserQuestionComponent} from "../user-question/personal.user.question.component";
import {PersonalUserChangePwdComponent} from "../user-change-pwd/personal.user.change.pwd.component";
import {NzNotificationService} from "ng-zorro-antd";
import {MemberPageComponent} from "../user-team/member-page/member.page.component";
import {MemberComponent} from "../user-team/member/member.component";
import {MemberLogComponent} from "../user-team/member-log/member.log.component";
import {MemberLoginDetailsComponent} from "../user-team/member-login-details/member.login.details.component";
import {MemberLoginStatisticsComponent} from "../user-team/member-login-statistics/member.login.statistics.component";
import {MemberAmountStatisticsComponent} from "../user-team/member-amount-statistics/member-amount-statistics.component";
import {PersonalService} from "./personal.service";


const routes: Routes = [
  {
    path: "",
    component: PersonalComponent,
    children:[
      {
        path: "info",
        component: PersonalUserInfoComponent,
      },
      {
        path: "paylist",
        component: PersonalUserPaylistComponent,
      },
      {
        path: "data",
        component: PersonalRightDataViewComponent,
      },
      {
        path: "loglogin",
        component: PersonalUserLogloginComponent,
      },
      {
        path: "searchlog",
        component: PersonalUserSearchlogComponent,
      },
      {
        path: "question",
        component: PersonalUserQuestionComponent,
      },
      {
        path:"changePwd",
        component:PersonalUserChangePwdComponent,
      },
      {
        path:'',
        redirectTo:'info',
        component : PersonalUserInfoComponent
      },
      {
        path:'team',
        component : MemberPageComponent,
        children:[
          {
            path:'amount',
            component:MemberAmountStatisticsComponent
          },
          {
            path:'member',
            component:MemberComponent
          },
          {
            path:'log',
            component:MemberLogComponent
          },
          {
            path:'details',
            component:MemberLoginDetailsComponent
          },
          {
            path:'statistics',
            component:MemberLoginStatisticsComponent
          },
          {
            path:'',
            redirectTo:'amount',
            component : MemberAmountStatisticsComponent
          },
        ]

      }
    ]
  }
];

@NgModule({
  declarations: [
    PersonalComponent,
    PersonalLeftNavigateComponent,
    PersonalUserInfoComponent,
    PersonalRightDataViewComponent,
    PersonalUserPaylistComponent,
    PersonalUserLogloginComponent,
    PersonalUserSearchlogComponent,
    PersonalUserQuestionComponent,
    PersonalUserChangePwdComponent,
    MemberPageComponent,
    //成员管理
    MemberAmountStatisticsComponent,
    MemberComponent,
    MemberLogComponent,
    MemberLoginDetailsComponent,
    MemberLoginStatisticsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    NzNotificationService,
    PersonalService
  ]
})
export class PersonalModule {
}
