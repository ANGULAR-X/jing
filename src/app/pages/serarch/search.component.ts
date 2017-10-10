import {Component} from '@angular/core';
import {QueryParamsModel} from "./model/query-params.model";
import {QueryTagModel} from "./model/query-tag.model";
import {SearchValidateService} from "./search.validate.service";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {UtilService} from "../../common/services/util.service";
import {SubjectService} from "../../common/services/subject.service";
import {QueryTabsModel} from "./model/query-tabs.model";
import {NzModalService} from "ng-zorro-antd";
import {URLS} from "../../common/services/server.url";

@Component({
  selector: 'search-box',
  templateUrl: './search.component.html'
})

export class SearchBoxComponent {
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryTab : QueryTabsModel = new QueryTabsModel();
  public alerts : any = [];
  public preciseOne = [];
  public preciseTwo = [];
  public childList = [];
  public precise = new Object();
  public tooltips : any = [{type:0,imgUrl:'../../../assets/img/type0.png',tooltipName:'数据查询',isActive:true}
                          ,{type:5,imgUrl:'../../../assets/img/type5.png',tooltipName:'实用工具',isActive:false}];
  public inputOfDataModels : any = [{propertyName:'keyword',hidden:false,placeholderText:'请输入手机号/QQ号/姓名/身份证号/地址/邮箱/其他任意关键字'}
                                  ,{propertyName:'weibo',hidden:true,placeholderText:'请输入新浪微博昵称关键字'}
                                  ,{propertyName:'company',hidden:true,placeholderText:'请输入公司名字关键字'}
                                  ,{propertyName:'qqdata',hidden:true,placeholderText:'请输入QQ号/QQ昵称/QQ群号'}
                                  ,{propertyName:'website',hidden:true,placeholderText:'请输入11位手机号码'}
                                  ,{propertyName:'ipaddress',hidden:true,placeholderText:'请输入IP地址(例如：192.168.0.1)'}
                                  ,{propertyName:'bankCardMobile',hidden:true,placeholderText:'请输入银行卡号'}
                                  ,{propertyName:'logistics',hidden:true,placeholderText:'请输入手机号'}
                                  ,{propertyName:'logisticsmap',hidden:true,placeholderText:'请输入手机号'}
                                  ,{propertyName:'eduName',hidden:true,placeholderText:'请输入中文姓名(选填)'}
                                  ,{propertyName:'eduIDcard',hidden:true,placeholderText:'身份证号（15~18位）(必填)'}
                                  ,{propertyName:'mobileAddress',hidden:true,placeholderText:'请输入11位手机号码'}
                                  ,{propertyName:'mobileCriminals',hidden:true,placeholderText:'请输入11位手机号码'}
                                  ,{propertyName:'courtName',hidden:true,placeholderText:'请输入中文姓名'}
                                  ,{propertyName:'courtIDcard',hidden:true,placeholderText:'身份证号（15~18位）'}
                                  ,{propertyName:'courtMobile',hidden:true,placeholderText:'手机号码'}
                                  ];
  public inputOfToolModels : any = [{propertyName:'toolsip',hidden:false,placeholderText:'请输入IP地址(例如：192.168.0.1)'}
                                  ,{propertyName:'toolExp',hidden:true,placeholderText:'请输入运单号'}
                                  ,{propertyName:'toolsvin',hidden:true,placeholderText:'请输入VIN车架号'}
                                  ,{propertyName:'toolsidcard',hidden:true,placeholderText:'请输入身份证号'}
                                  ,{propertyName:'toolsdomain',hidden:true,placeholderText:'请输入域名'}
                                  ,{propertyName:'toolszip',hidden:true,placeholderText:'请输入邮编'}
                                ];
  constructor (public searchValidateService : SearchValidateService,
               public router : Router,
               public http : Http,
               public utilService : UtilService,
               public confirmServ : NzModalService,
               public subjectService : SubjectService) {
    let data = JSON.parse(localStorage.getItem('currentQuery'));
    data = data || null;
    if (data) {
      this.queryTag = data.tag;
      this.queryParams = data.params;
      this.selectQueryTooltip(this.queryTag.currentTooltipType);
    } else {
      this.queryTag.currentType = 'keyword';
      this.queryTag.currentTypeName = '超级查询';
      this.queryTag.currentNotValidateMsg = '';
      this.selectQueryTooltip(0);
    }

  }

  /**
   * 选择查询子标签
   * @param {string} type
   */
  selectQueryType (type : string,tagName : string) {
    this.queryTag.currentType = type;
    this.queryTag.currentTypeName = tagName;
    for (let i = 0; i < this.inputOfDataModels.length; i++) {
      this.inputOfDataModels[i].hidden = true;
      if (this.inputOfDataModels[i].propertyName == type) {
        this.inputOfDataModels[i].hidden = false;
      }
    }
    for (let i = 0; i < this.inputOfToolModels.length; i++) {
      this.inputOfToolModels[i].hidden = true;
      if (this.inputOfToolModels[i].propertyName == type) {
        this.inputOfToolModels[i].hidden = false;
      }
    }
    if (type == 'precise') {
      this.http.get(URLS.search.preciseType).subscribe(res => {
        if (res.json().code == 1) {
          let arr = res.json().data;
          for (let i = 0; i < arr.length; i++) {
            for (let j in arr[i].type) {
              this.preciseOne.push({
                key:j,
                name:arr[i].type[j],
                index : arr[i].index
              });
            }
          }
          this.precise['one']=this.preciseOne[0];
        }
      })
    }
  }

  /**
   * 选择查询主类别
   * @param {number} type
   */
  selectQueryTooltip(type:number) {
    this.queryTag.currentTooltipType = type;
    for (let i = 0; i < this.tooltips.length; i++) {
      this.tooltips[i].isActive = false;
      if (this.tooltips[i].type == type) {
        this.tooltips[i].isActive = true;
      }
      if (type == 0) {
        this.selectQueryType('keyword','超级查询');
      }
      if (type == 5) {
        this.selectQueryType('toolsip','IP地址解析');
      }
    }
  }

  onChange (e) {
    this.preciseTwo = [];
    let url = URLS.search.preciseTwo+e.index+'/types/'+e.key+'/fields';
    this.http.get(url).subscribe(res => {
      if (res.json().code == 1) {
        let data = res.json().data;
        if (data) {
          for (let i in data) {
            this.preciseTwo.push({
              key : i,
              val : data[i]
            })
          }
        }
      }
    })
  }


  public addInput () {
    let htmlText =
      `<div class="precise-box">
         <select>
          <option *ngFor="let pw of preciseTwo;let i = index" [ngValue]="pw">{{pw.val}}</option>
         </select>
         <input type="search"  class="txt-input addinput precise lastchild" placeholder="动态添加"/>
         <div class="search-button oticon">
          <b class="iconfont">+</b>
         </div>
         <div class="search-button oticon">
           <b class="iconfont">-</b>
         </div>
       </div>`;
    this.childList.push(htmlText);
  }

  /**
   * 重置查询tabs
   * @param queryTab
   */
  resetQueryTabs (queryTab : QueryTabsModel) {
    let queryTabs : any;
    queryTabs = JSON.parse(localStorage.getItem('queryTabs'));
    queryTabs = queryTabs || [];
    queryTabs.add(queryTab);
    localStorage.setItem('queryTabs',JSON.stringify(queryTabs));
  }

  public info (config:any) {
    let _config = {
      okText:'确定'
    }
    _config = Object.assign(_config,config);
    this.confirmServ.info(_config);
  }


  /**
   * 根据条件搜索数据
   */
  searchByCondition () {
    this.alerts = [];
    let isValidate = this.searchValidateService.validate(this.queryTag.currentType,this.queryParams[this.queryTag.currentType]);
    this.queryTab.params= this.queryParams;
    this.queryTab.tag = this.queryTag;
    switch (this.queryTag.currentType) {
      case 'qqdata' :
        if (!isValidate) {
          this.info({content : '请输入合法的qq号码！'});
          return;
        }
        break;
      case 'logistics':
        if (!isValidate) {
          this.info({content : '请输入正确的手机号！'});
          return;
        }
        break;
      case 'mobileAddress':
        if (!isValidate) {
          this.info({content : '请输入正确的手机号！'});
          return;
        }
        break;
      case 'website':
        if (!isValidate) {
          this.info({content : '请输入正确的手机号！'});
          return;
        }
        break;
      case 'logisticsmap':
        if (!isValidate) {
          this.info({content : '请输入正确的手机号！'});
          return;
        }
        break;
      case 'company':
        if (!isValidate) {
          this.info({content : '请输入合法的公司名字！'});
          return;
        }
        break;
      case 'weibo':
        if (!isValidate) {
          this.info({content : '关键字不少于两个字！'});
          return;
        }
        break;
      case 'ipaddress':
        if (!isValidate) {
          this.info({content : '请输入正确的IP地址！'});
          return;
        }
        break;
      case 'toolsip':
        if (!isValidate) {
          this.info({content : '请输入正确的IP地址！'});
          return;
        }
        break;
    }
    localStorage.setItem('currentQuery',JSON.stringify({params : this.queryParams,tag : this.queryTag}));
    this.utilService.resetQueryTabs(this.queryTab);
    let type = this.queryTab.tag.currentType;
    let url = 'data-list/' + type;
    this.router.navigate([url]);

  }

  resetAlert () {
    this.alerts = this.alerts.map((alert:any) => Object.assign({},alert));
  }


}
