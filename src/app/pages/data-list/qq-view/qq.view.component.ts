/**
 * Created by front on 2017/9/26.
 */
import {Component, OnInit} from '@angular/core';
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {DataSearchService} from "../page/data.page.service";
import {URLS} from "../../../common/services/server.url";

@Component({
  selector: 'qq-view',
  templateUrl: './qq.view.component.html'
})

export class QQViewComponent implements OnInit {
  public qqSubscription : any;
  public qqdata : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'qqdata';
    this.queryTag.currentTypeName = 'QQ关联';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.qqSubscription = this.subjectService.getObservable(SubjectKey.QQDATA).subscribe(data => {
      if (data) {
        this.fetchData();
      }
    });
  }

  fetchData(){
    this.isLoading = true;
    let data = JSON.parse(localStorage.getItem('currentQuery'));
    data = data || null;
    if (!data) return;
    this.queryParams = data.params;
    let url = URLS.search.qqdata + "?query=" + encodeURI(this.queryParams['qqdata']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == 1) {
        this.isLoading = false;
        this.qqdata = res.json().data;
        console.log(this.qqdata);
      }
    })
  }

  ngOnDestroy() {
    if (this.qqSubscription) {
      this.qqSubscription.unsubscribe();
    }
  }
}
