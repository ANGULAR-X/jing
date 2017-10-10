import {Component} from '@angular/core';
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";

@Component({
  selector: 'data-page',
  templateUrl: './data.page.component.html'
})

export class DataPageComponent {
  public loginSubscription: any;

  constructor(public subjectService: SubjectService) {

  }

  ngOnInit() {
    this.loginSubscription = this.subjectService.getObservable(SubjectKey.QUERYTAG).subscribe(data => {

    })
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

}
