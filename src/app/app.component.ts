import {Component,ElementRef, Renderer,} from '@angular/core';
import {Router, RouterState, RouterStateSnapshot } from '@angular/router';
import {SubjectKey, SubjectService} from "./common/services/subject.service";

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public currentUser: any;
  public loginSubscription: any;
  public globalClickBackFn : Function;

  constructor(public router: Router,
              public elementRef: ElementRef,
              public renderer: Renderer,
              public subjectService : SubjectService) {

  }

  ngOnInit() {

    this.globalClickBackFn = this.renderer.listen(this.elementRef.nativeElement,'click',(event:any) => {
      var $obj =$('#searchdown');
      $obj.removeClass('active');
    })

    this.loginSubscription = this.subjectService.getObservable(SubjectKey.LOGIN_STAT).subscribe(data => {
      let routerState: RouterState = this.router.routerState;
      let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
      this.currentUser = data;
      console.log("A");
      if (routerStateSnapshot.url.indexOf("/login") != -1) {
        this.router.navigateByUrl("/home");
      }
      if (!data) {
        this.router.navigateByUrl("");
      }
    },error => {
      console.error(error);
    });
  }

  ngOnDestroy() {
    if (this.globalClickBackFn) {
      this.globalClickBackFn();
    }
    this.loginSubscription.unsubscribe();
  }
}
