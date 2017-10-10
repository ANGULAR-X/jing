import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {URLS} from "../../../common/services/server.url";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {DataSearchService} from "../page/data.page.service";

@Component({
  selector:'website-view',
  templateUrl:'website.view.component.html'
})

export class WebsiteViewComponent{
  public websiteSubscription : any;
  public websiteData : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'website';
    this.queryTag.currentTypeName = '互联网轨迹';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.websiteSubscription = this.subjectService.getObservable(SubjectKey.LOGISTICS).subscribe(data => {
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
    let url = URLS.search.website+'?scrollId=1&pageSize=20&mobilePhone='+ encodeURI(this.queryParams['website']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == 1) {
        this.isLoading = false;
        this.websiteData = res.json().data;
        console.log(res.json().data)
      }
    })
  }
}
