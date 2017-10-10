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
  selector: 'weibo-view',
  templateUrl: './weibo.view.component.html'
})

export class WeiboViewComponent implements OnInit {
  public weiboSubscription : any;
  public weiboData : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'weibo';
    this.queryTag.currentTypeName = '实时物流';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.weiboSubscription = this.subjectService.getObservable(SubjectKey.WEIBO).subscribe(data => {
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
    let url = URLS.search.microblog + "?pageSize=160&page=1&userName=" + encodeURI(this.queryParams['weibo']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == 1) {
        this.isLoading = false;
        this.weiboData = res.json().data;
        console.log(this.weiboData);
      }
    })
  }

  ngOnDestroy() {
    if (this.weiboSubscription) {
      this.weiboSubscription.unsubscribe();
    }
  }
}
