import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserLoginComponent} from "./pages/user/user-login/user-login.component";
import {ServerURLInterceptor} from "./common/services/serverURLInterceptor";
import {Http, RequestOptions, XHRBackend, HttpModule} from "@angular/http";
import {InterceptorService} from "ng2-interceptors";
import {GroupActiveDirective} from "./common/directives/group-active.directive";
import {AuthGuard} from "./common/services/auth-guard";
import {TipsTemplateService} from "./common/services/tips.template.service";
import {FirstLoginComponent} from "./common/components/first-login/first.login.component";
import {NgZorroAntdModule, NzMessageService, NzNotificationService, NzModalService} from "ng-zorro-antd";
import {TopbarComponent} from "./common/components/topbar/topbar.component";
import {MobileCodeComponent} from "./common/components/mobile-code/mobile.code.component";
import {SearchValidateService} from "./pages/serarch/search.validate.service";
import {SearchInputComponent} from "./pages/data-list/search-input/search.input.component";
import {DropdownDirective} from "./pages/data-list/search-input/dropdown.directive";
import {UtilService} from "./common/services/util.service";
import {SubjectService} from "./common/services/subject.service";
import {RouterModule} from "@angular/router";
import {HighchartsDirective} from "./common/directives/highcharts.directive";
import {SafeHtml} from "./common/pipes/safe-html.pipe";
import {DataSearchService} from "./pages/data-list/page/data.page.service";
import {UserLoginService} from "./pages/user/user-login/user-login.service";
import {AmapComponent} from "./common/components/amap/amap.component";
import {KeysPipe} from "./common/pipes/keys.pipe";
import {IconsPipe} from "./common/pipes/icons.pipe";
import {MobileCodeDirective} from "./common/directives/mobile-code.directive";

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, serverURLInterceptor: ServerURLInterceptor) {
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(serverURLInterceptor);
  return service;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule
  ],
  declarations: [
    UserLoginComponent,
    GroupActiveDirective,
    HighchartsDirective,
    MobileCodeDirective,
    FirstLoginComponent,
    TopbarComponent,
    MobileCodeComponent,
    SearchInputComponent,
    AmapComponent,
    DropdownDirective,
    SafeHtml,
    KeysPipe,
    IconsPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    UserLoginComponent,
    TopbarComponent,
    AmapComponent,
    DropdownDirective,
    GroupActiveDirective,
    HighchartsDirective,
    MobileCodeDirective,
    FirstLoginComponent,
    MobileCodeComponent,
    SafeHtml,
    KeysPipe,
    IconsPipe
  ],
  providers: [
    AuthGuard,
    TipsTemplateService,
    SearchValidateService,
    NzNotificationService,
    NzMessageService,
    NzModalService,
    UtilService,
    DataSearchService,
    ServerURLInterceptor,
    {
      provide: Http,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, ServerURLInterceptor]
    }
  ],
  entryComponents: [FirstLoginComponent]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SubjectService]
    };
  }
}
