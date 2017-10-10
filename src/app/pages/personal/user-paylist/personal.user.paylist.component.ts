import {Component} from "@angular/core";
import { Http } from '@angular/http';
import { URLS } from "../../../common/services/server.url";

let  that;
@Component({
  selector:'personal-user-paylist',
  templateUrl:'./personal.user.paylist.component.html'
})

export class PersonalUserPaylistComponent{
  public tableData : any;
  //当前显示页数
  _current = 1;
  //每页显示多少
  _pageSize = 10;
  //总条数
  _total = 1;
  _loading = true;

  constructor(
    public http:Http){
    that = this;
  }

  refreshData() {
    let pageNum = this._current;
    this.http.get(URLS.center.paylist+"?page="+pageNum+"&pageSize="+10).subscribe(res=>{
      if (res.json().code =='1'){
        this._loading = false;
        this._total = res.json().data.totalRowNum;
        this.tableData = res.json().data;
      }
    })
  };

  ngOnInit() {
    this.refreshData();
  }
}
