import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {URLS} from "../../../../common/services/server.url";
import {SearchParamsModal} from "../../page/search.params.modal";
import {PersonalService} from "../../page/personal.service";

@Component({
    selector:'member',
    templateUrl:'member.component.html'
})

//成员列表
export class MemberComponent{
  public searchParams:SearchParamsModal =new SearchParamsModal();
  public tableData:any;
  public id:any;
  constructor(public http:Http,public personalService:PersonalService){
    this.searchParams.current=1;
    this.searchParams.pageSize=15;
    this.searchParams.pageNumber=1;
  }

  refreshData(params:SearchParamsModal) {
    params.pageNumber = params.current;
    this.searchParams.isLoading = true;
    this.http.get(URLS.center.member+"?page="+params.pageNumber+"&pageSize="+params.pageSize+"&id="+this.id).subscribe(res=>{
      if (res.json().code !='1'){
        this.searchParams.isLoading = false;
        return
      }
      this.searchParams.isLoading = false;
      this.tableData = res.json().data;
      this.searchParams.total = res.json().data.totalRowNum;
    })
  };

  userDisabled(id){
    this.http.post(URLS.center.userdelete+'?id='+id,{}).subscribe(res=>{
        if(res.json().code =='1'){
          this.refreshData(this.searchParams);
        }
    })
  }
  ngOnInit(){
    this.personalService.getuserList().subscribe(res=>{
      if(res.json().code =='1'){
        this.id=res.json().data[0]['id'];
        this.refreshData(this.searchParams);
      }
    });
  }
}
