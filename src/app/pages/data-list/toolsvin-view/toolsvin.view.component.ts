import {Component} from "@angular/core";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {DataSearchService} from "../page/data.page.service";
import {URLS} from "../../../common/services/server.url";

@Component({
  selector:'toolsvin-view',
  templateUrl:'toolsvin.view.component.html'
})

export class ToolsvinViewComponent{

  public toolsvinData:any;
  public toolsvinSubscription : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'toolsvin';
    this.queryTag.currentTypeName = 'VIN车架号解析';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.toolsvinSubscription = this.subjectService.getObservable(SubjectKey.TOOLSVIN).subscribe(data => {
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
    console.log(this.queryParams['toolsvin'])
    let url = URLS.search.toolsvin+'?vin='+encodeURI(this.queryParams['toolsvin']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == '1') {
        this.isLoading = false;
        this.toolsvinData = res.json().data;
        console.log(res.json().data)
      }
    })
  }
}
