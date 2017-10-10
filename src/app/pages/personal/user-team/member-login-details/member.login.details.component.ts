import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {PersonalService} from "../../page/personal.service";
import {SearchParamsModal} from "../../page/search.params.modal";
import {URLS} from "../../../../common/services/server.url";

@Component({
  selector:'member-login-details',
  templateUrl:'member.login.details.component.html'
})

export class MemberLoginDetailsComponent{
  public searchParams:SearchParamsModal =new SearchParamsModal();
  public tableData:any;
  options  = [];
  selectedOption;
  public id:any;
  constructor(public http:Http,public personalService:PersonalService){
    this.searchParams.current=1;
    this.searchParams.pageSize=15;
    this.searchParams.pageNumber=1;
  }

  refreshData(params:SearchParamsModal,type:string) {
    if (type != 'day') {
      params.pageNumber = params.current;
    }else {
      params.pageNumber=1;
    }
    this.searchParams.isLoading = true;
    this.http.get(URLS.center.userdetails+"?page="+params.pageNumber+"&pageSize="+params.pageSize+"&id="+this.id).subscribe(res=>{
      if (res.json().code !='1'){
        this.searchParams.isLoading = false;
        return
      }
      this.searchParams.isLoading = false;
      this.tableData = res.json().data;
      this.searchParams.total = res.json().data.totalRowNum;
    })
  };
  selectUser(){
    this.id = this.selectedOption.value;
    this.refreshData(this.searchParams,'day');
  }

  ngOnInit(){
    this.personalService.getuserList().subscribe(res=>{
      if(res.json().code=='1'){
        this.id=res.json().data[0]['id'];
        for (var i=0;i<res.json().data.length;i++){
          this.options.push({value:res.json().data[i].id,label:res.json().data[i].account})
        }
        this.selectedOption = this.options[ 0 ];
        this.refreshData(this.searchParams,'page');
      }
    });

  }
}
