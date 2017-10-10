import {BrowserModule}              from '@angular/platform-browser';
import {NgModule}     from '@angular/core';
import {FormsModule}                from '@angular/forms';
import {RouterModule}               from "@angular/router";
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule}    from "@angular/platform-browser/animations";
import {AppComponent}               from './app.component';
import {ROUTES}                     from "./app.routes";
import {SharedModule}               from "./shared.module";
import {UserLoginService} from "./pages/user/user-login/user-login.service";
import {IsLastDirective} from "./common/directives/islast.directive";
import * as $ from 'jquery';
import {PreloadSelectedModules} from "./common/services/preload-selected-modules";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, {useHash: false,preloadingStrategy: PreloadSelectedModules}),
    SharedModule.forRoot()
  ],
  declarations: [
    AppComponent,
    IsLastDirective
  ],
  providers: [
    UserLoginService,
    PreloadSelectedModules,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


}
