import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {URLS} from "../../../common/services/server.url";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {DataSearchService} from "../page/data.page.service";

@Component({
  selector:'toolsip-view',
  templateUrl:'toolsip.view.component.html'
})

export class ToolsipViewComponent{
  public ip:any;
  public toolipData:any;
  public toolipSubscription : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'toolsip';
    this.queryTag.currentTypeName = 'IP解析';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.toolipSubscription = this.subjectService.getObservable(SubjectKey.TOOLSIP).subscribe(data => {
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
    this.ip=this.queryParams['toolsip'];
    let url = URLS.search.toolip+'?ip='+encodeURI(this.queryParams['toolsip']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == '1') {
        this.isLoading = false;
        this.toolipData = res.json().data;
      }
    })
  }

}
