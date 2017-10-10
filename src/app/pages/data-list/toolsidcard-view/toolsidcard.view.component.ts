import {Component} from "@angular/core";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {DataSearchService} from "../page/data.page.service";
import {URLS} from "../../../common/services/server.url";

@Component({
  selector:'toolsidcard-view',
  templateUrl:'toolsidcard.view.component.html'
})

export class ToolsidcardViewComponent{
  public toolsidcardnData:any;
  public toolsidcardSubscription : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  public vuleObj=[];
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'toolsidcard';
    this.queryTag.currentTypeName = '身份证解析';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.toolsidcardSubscription = this.subjectService.getObservable(SubjectKey.TOOLSIDCARD).subscribe(data => {
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
    let url = URLS.search.toolsidcard+'?cardno='+encodeURI(this.queryParams['toolsidcard']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == '1') {
        this.isLoading = false;
        this.toolsidcardnData = res.json().data;
        console.log(res.json().data)
      }
    })
  }
}
