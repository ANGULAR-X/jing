import {Component} from "@angular/core";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {DataSearchService} from "../page/data.page.service";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {URLS} from "../../../common/services/server.url";

@Component({
  selector:'toolszip-view',
  templateUrl:'toolszip.view.component.html'
})

export class ToolszipViewComponent{
  public toolszipData:any;
  public toolszipSubscription : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'toolszip';
    this.queryTag.currentTypeName = '邮编信息';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.toolszipSubscription = this.subjectService.getObservable(SubjectKey.TOOLSZIP).subscribe(data => {
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
    let url = URLS.search.toolszip+'?zipcode='+encodeURI(this.queryParams['toolszip']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == '1') {
        this.isLoading = false;
        this.toolszipData = res.json().data;
        console.log(res.json().data)
      }
    })
  }
}
