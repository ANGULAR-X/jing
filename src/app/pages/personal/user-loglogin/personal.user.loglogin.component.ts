import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {URLS} from "../../../common/services/server.url";
import * as moment from 'moment';
import {SearchParamsModal} from "../page/search.params.modal";
import {NzModalService} from "ng-zorro-antd";

@Component({
  selector:"personal-user-loglogin",
  templateUrl:"personal.user.loglogin.component.html"
})

export class PersonalUserLogloginComponent{
  public searchParams : SearchParamsModal = new SearchParamsModal();
  public tableData : any;

  constructor(public http:Http,public confirmServ: NzModalService){
    this.searchParams.current = 1;
    this.searchParams.pageSize = 15;
    this.searchParams.pageNumber = 1;
    this.searchParams.startTime = '';
    this.searchParams.endTime = '';
  }

  info(contentTpl) {
    this.confirmServ.info({
      okText:'确定',
      content: contentTpl
    });
  }
  refreshData(params : SearchParamsModal,type:string) {
    this.validateSearchParams(params);
    if (type != 'day') {
      params.pageNumber = params.current;
    }else {
      params.pageNumber=1;
    }
    this.searchParams.isLoading = true;
    this.http.get(URLS.center.loglogin+"?page="+params.pageNumber+"&pageSize="+params.pageSize+"&startTime="+params.startTime+"&endTime="+params.endTime).subscribe(res=>{
      if (res.json().code !='1'){
        this.searchParams.isLoading = false;
        this.info("未查询到数据！");
        return
      }
      this.searchParams.isLoading = false;
      this.tableData = res.json().data;
      this.searchParams.total = res.json().data.totalRowNum;
    })
  };

  validateSearchParams (params : SearchParamsModal) {
    if (params._startDate && params._endDate) {
      params.startTime = moment(params._startDate).format('YYYY-MM-DD HH:MM:SS');
      params.endTime = moment(params._endDate).format('YYYY-MM-DD HH:MM:SS');
    } else {
      params.startTime ='';
      params.endTime = ''
    }
  };

  //时间选择器
  _startValueChange = () => {
    if (this.searchParams._startDate > this.searchParams._endDate) {
      this.searchParams._endDate = null;
    }
  };
  _endValueChange = () => {
    if (this.searchParams._startDate > this.searchParams._endDate) {
      this.searchParams._startDate = null;
    }
  };
  _disabledStartDate = (startValue) => {
    if (!startValue || !this.searchParams._endDate) {
      return false;
    }
    return startValue.getTime() >= this.searchParams._endDate.getTime();
  };
  _disabledEndDate = (endValue) => {
    if (!endValue || !this.searchParams._startDate) {
      return false;
    }
    return endValue.getTime() <= this.searchParams._startDate.getTime();
  };

  //筛选
  selectRefresh(){
    this.refreshData(this.searchParams,'day');
  }
  ngOnInit() {
    this.refreshData(this.searchParams,'page');
  }
}
