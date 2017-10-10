import {Component} from "@angular/core";
import {DataSearchService} from "../page/data.page.service";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {URLS} from "../../../common/services/server.url";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";

@Component({
  selector:'company-view',
  templateUrl:'./company.view.component.html'
})

export class CompanyViewComponent{
  public companySubscription : any;
  public companyData : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'company';
    this.queryTag.currentTypeName = '工商查询';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }
  ngOnInit() {
    this.companySubscription = this.subjectService.getObservable(SubjectKey.WEIBO).subscribe(data => {
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
    console.log(this.queryParams['company'])
    let url = URLS.search.company + '?query=' + encodeURI(this.queryParams['company']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == 1) {
        this.isLoading = false;
        this.companyData = res.json().data;
        console.log(this.companyData);
      }
    })
  }
}
