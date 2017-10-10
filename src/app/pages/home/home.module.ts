import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared.module";
import {HomeComponent} from "./home.component";
import {SearchBoxComponent} from "../serarch/search.component";
import {AuthGuard} from "../../common/services/auth-guard";

const routes: Routes = [
  {
    path: "",
    canActivate : [AuthGuard],
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [

  ]
})
export class HomeModule {
}
