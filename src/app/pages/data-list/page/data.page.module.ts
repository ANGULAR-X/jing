import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DataPageComponent} from "./data.page.component";
import {AuthGuard} from "../../../common/services/auth-guard";
import {SharedModule} from "../../../shared.module";
import {SearchTabsComponent} from "../search-tabs/search.tabs.component";
import {LeftMenuComponent} from "../left-menu/left.menu.component";
import {BottomViewComponent} from "../bottom-view/bottom.view.component";
import {LogisticsViewComponent} from "../logistics-view/logistics.view.component";
import {MobileStatusViewComponent} from "../mobile-status-view/mobile.status.view.component";
import {WeiboViewComponent} from "../weibo-view/weibo.view.component";
import {WebsiteViewComponent} from "../website-view/website.view.component";
import {QQViewComponent} from "../qq-view/qq.view.component";
import {WaterMarkDirective} from "../../../common/directives/watermark.directive";
import {ToolsipViewComponent} from "../toolsip-view/toolsip.view.component";
import {ToolsvinViewComponent} from "../toolsvin-view/toolsvin.view.component";
import {ToolsidcardViewComponent} from "../toolsidcard-view/toolsidcard.view.component";
import {ToolsdomainViewComponent} from "../toolsdomain-view/toolsdomain.view.component";
import {ToolszipViewComponent} from "../toolszip-view/toolszip.view.component";
import {WeiboDetailViewComponent} from "../weibo-detail-view/weibo.detail.view.component";
import {IpaddressMapComponent} from "../ipaddress-map/ipaddress.map.component";
import {GlobeMapComponent} from "../globe-map/globe.map.component";
import {PersonalService} from "../../personal/page/personal.service";
import {SuperQueryComponent} from "../super-query/super.query.component";
import {LogisticsMapComponent} from "../logistics-map/logistics.map.component";
import {CompanyViewComponent} from "../company-view/company.view.component";
import {CompanyDetailViewComponent} from "../company-detail-view/company.detail.view.component";



const routes: Routes = [
  {
    path: "",
    canActivate : [AuthGuard],
    component: DataPageComponent,
    children : [
      {
        path :'keyword',
        component : SuperQueryComponent
      },
      {
        path: "logistics",
        component : LogisticsViewComponent
      },
      {
        path: "mobileAddress",
        component : MobileStatusViewComponent
      },
      {
        path: "globe-map",
        component : GlobeMapComponent
      },
      {
        path: "weibo",
        component : WeiboViewComponent
      },
      {
        path:'weibo-detail',
        component : WeiboDetailViewComponent
      },
      {
        path: "qqdata",
        component : QQViewComponent
      },
      {
        path : '',
        redirectTo:'logistics',
        component : LogisticsViewComponent
      },
      {
        path : 'website',
        component : WebsiteViewComponent
      },
      {
        path : 'toolsip',
        component : ToolsipViewComponent
      },
      {
        path : 'toolsvin',
        component : ToolsvinViewComponent
      },
      {
        path : 'toolsidcard',
        component : ToolsidcardViewComponent
      },
      {
        path : 'toolsdomain',
        component : ToolsdomainViewComponent
      },
      {
        path : 'toolszip',
        component : ToolszipViewComponent
      },
      {
        path : 'ipaddress',
        component : IpaddressMapComponent
      },
      {
        path : 'logisticsmap',
        component : LogisticsMapComponent
      },
      {
        path:'company',
        component:CompanyViewComponent
      },
      {
        path:'company-detail',
        component : CompanyDetailViewComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    //注入组件
    DataPageComponent,
    SearchTabsComponent,
    LeftMenuComponent,
    BottomViewComponent,
    LogisticsViewComponent,
    MobileStatusViewComponent,
    WebsiteViewComponent,
    WeiboViewComponent,
    ToolsipViewComponent,
    QQViewComponent,
    WaterMarkDirective,
    ToolsvinViewComponent,
    ToolsidcardViewComponent,
    ToolsdomainViewComponent,
    ToolszipViewComponent,
    IpaddressMapComponent,
    GlobeMapComponent,
    LogisticsMapComponent,
    WeiboDetailViewComponent,
    SuperQueryComponent,
    CompanyViewComponent,
    CompanyDetailViewComponent
  ],
  imports: [
    //引入的文件
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    PersonalService
  ]
})
export class DataPageModule {
}
