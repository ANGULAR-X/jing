import {Routes} from '@angular/router';
import {UserLoginComponent} from "./pages/user/user-login/user-login.component";
import {AuthGuard} from "./common/services/auth-guard";

export const ROUTES: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:UserLoginComponent

  },
  {
    path:'home',
    loadChildren:'./pages/home/home.module#HomeModule'
  },
  {
    path:'personal',
    loadChildren:'./pages/personal/page/personal.module#PersonalModule'
  },
  {
    path:'data-list',
    loadChildren:'./pages/data-list/page/data.page.module#DataPageModule'
  },
  {
    path:'**',//fallback router must in the last
    component:UserLoginComponent
  }
];
