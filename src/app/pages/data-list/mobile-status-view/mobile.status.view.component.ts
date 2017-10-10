/**
 * Created by front on 2017/9/25.
 */
import {Component, OnInit} from '@angular/core';
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {DataSearchService} from "../page/data.page.service";
import {URLS} from "../../../common/services/server.url";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";

@Component({
  selector: 'mobile-status-view',
  templateUrl: './mobile.status.view.component.html'
})

export class MobileStatusViewComponent implements OnInit {
  public mobileStatusSubscription: any;
  public mobileStatusData: any;
  public queryTag: QueryTagModel = new QueryTagModel();
  public queryParams: QueryParamsModel = new QueryParamsModel();
  public isLoading: boolean = false;

  constructor(public subjectService: SubjectService, public dataSearchService: DataSearchService) {
    this.queryTag.currentType = 'mobileAddress';
    this.queryTag.currentTypeName = '手机状态';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.mobileStatusSubscription = this.subjectService.getObservable(SubjectKey.MOBILEADDRESS).subscribe(data => {
      if (data) {
        this.fetchData();
      }
    });
  }

  fetchData() {
    this.isLoading = true;
    let data = JSON.parse(localStorage.getItem('currentQuery'));
    data = data || null;
    if (!data) return;
    this.queryTag = data.tag;
    this.queryParams = data.params;
    let url = URLS.search.mobileAddress + '?phone=' + this.queryParams['mobileAddress'];
    this.mobileStatusData = {};
    this.dataSearchService.searchByParams(url, this.queryTag, this.queryParams).subscribe(res => {
      if (res.json().code == 1) {
        this.mobileStatusData = Object.assign({}, res.json().data);
        this.isLoading = false;
        if (this.mobileStatusData.result && Object.prototype.toString.apply(this.mobileStatusData.result) == "[object Object]") {
          this.mobileStatusData.resultList.push(this.mobileStatusData.result);
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.mobileStatusSubscription) {
      this.mobileStatusSubscription.unsubscribe();
    }
  }
}
