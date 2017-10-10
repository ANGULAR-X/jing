/**
 * Created by front on 2017/9/25.
 */
import {Component, OnInit} from '@angular/core';
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {DataSearchService} from "../page/data.page.service";
import {URLS} from "../../../common/services/server.url";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {Router} from "@angular/router";

@Component({
  selector: 'logistics-view',
  templateUrl: './logistics.view.component.html'
})

export class LogisticsViewComponent implements OnInit {
  public logisticsSubscription: any;
  public logisticsData: any;
  public queryTag: QueryTagModel = new QueryTagModel();
  public queryParams: QueryParamsModel = new QueryParamsModel();
  public isLoading: boolean = false;

  constructor(public router: Router,public subjectService: SubjectService, public dataSearchService: DataSearchService) {
    this.queryTag.currentType = 'logistics';
    this.queryTag.currentTypeName = '实时物流';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.logisticsSubscription = this.subjectService.getObservable(SubjectKey.LOGISTICS).subscribe(data => {
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
    this.queryParams = data.params;
    this.logisticsData = null;
    let url = URLS.search.logistics + "?rowNumPerPage=20&scrollId=1&phone=" + encodeURI(this.queryParams['logistics']);
    this.dataSearchService.searchByParams(url, this.queryTag, this.queryParams).subscribe(res => {
      if (res.json().code == 1) {
        this.isLoading = false;
        this.logisticsData = Object.assign({}, res.json().data);
      }
    })
  }

  toLogisticsMap (l : any) {
    this.router.navigate(['/data-list/globe-map'], {queryParams: {'location': JSON.stringify(l)}});
  }

  ngOnDestroy() {
    if (this.logisticsSubscription) {
      this.logisticsSubscription.unsubscribe();
    }
  }
}
