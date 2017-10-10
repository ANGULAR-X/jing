import {Component} from "@angular/core";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {DataSearchService} from "../page/data.page.service";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {URLS} from "../../../common/services/server.url";

@Component({
  selector:'toolsdomain-view',
  templateUrl:'toolsdomain.view.component.html'
})

export class ToolsdomainViewComponent{
  public toolsdomainData:any;
  public toolsdomainSubscription : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  public vuleObj=[];
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'toolsdomain';
    this.queryTag.currentTypeName = '域名信息查询';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.toolsdomainSubscription = this.subjectService.getObservable(SubjectKey.TOOLSDOMAIN).subscribe(data => {
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
    let url = URLS.search.toolsdomain+'?domain='+encodeURI(this.queryParams['toolsdomain']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == '1') {
        this.isLoading = false;
        this.toolsdomainData = res.json().data;
        console.log(res.json().data)
      }
    })
  }
}
