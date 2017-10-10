import {Component, Directive, ElementRef, OnInit, Renderer} from '@angular/core';
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {SearchValidateService} from "../../serarch/search.validate.service";
import {Router} from "@angular/router";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {QueryTabsModel} from "../../serarch/model/query-tabs.model";
import {UtilService} from "../../../common/services/util.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";

@Component({
  selector: 'search-input',
  templateUrl: './search.input.component.html'
})

export class SearchInputComponent {
  public queryParams: QueryParamsModel = new QueryParamsModel();
  public queryTag: QueryTagModel = new QueryTagModel();
  public queryTab: QueryTabsModel = new QueryTabsModel();
  public tabsSubscription: any;
  public inputOfDataModels: any = [{
    propertyName: 'keyword',
    hidden: false,
    placeholderText: '请输入手机号/QQ号/姓名/身份证号/地址/邮箱/其他任意关键字'
  }
    , {propertyName: 'weibo', hidden: true, placeholderText: '请输入新浪微博昵称关键字'}
    , {propertyName: 'company', hidden: true, placeholderText: '请输入公司名字关键字'}
    , {propertyName: 'qqdata', hidden: true, placeholderText: '请输入QQ号/QQ昵称/QQ群号'}
    , {propertyName: 'website', hidden: true, placeholderText: '请输入11位手机号码'}
    , {propertyName: 'ipaddress', hidden: true, placeholderText: '请输入IP地址(例如：192.168.0.1)'}
    , {propertyName: 'bankCardMobile', hidden: true, placeholderText: '请输入银行卡号'}
    , {propertyName: 'logistics', hidden: true, placeholderText: '请输入手机号'}
    , {propertyName: 'logisticsmap', hidden: true, placeholderText: '请输入手机号'}
    , {propertyName: 'eduName', hidden: true, placeholderText: '请输入中文姓名(选填)'}
    , {propertyName: 'eduIDcard', hidden: true, placeholderText: '身份证号（15~18位）(必填)'}
    , {propertyName: 'mobileAddress', hidden: true, placeholderText: '请输入11位手机号码'}
    , {propertyName: 'mobileCriminals', hidden: true, placeholderText: '请输入11位手机号码'}
    , {propertyName: 'courtName', hidden: true, placeholderText: '请输入中文姓名'}
    , {propertyName: 'courtIDcard', hidden: true, placeholderText: '身份证号（15~18位）'}
    , {propertyName: 'courtMobile', hidden: true, placeholderText: '手机号码'}
  ];
  public inputOfToolModels: any = [{propertyName: 'toolsip', hidden: false, placeholderText: '请输入IP地址(例如：192.168.0.1)'}
    , {propertyName: 'toolExp', hidden: true, placeholderText: '请输入运单号'}
    , {propertyName: 'toolsvin', hidden: true, placeholderText: '请输入VIN车架号'}
    , {propertyName: 'toolsidcard', hidden: true, placeholderText: '请输入身份证号'}
    , {propertyName: 'toolsdomain', hidden: true, placeholderText: '请输入域名'}
    , {propertyName: 'toolszip', hidden: true, placeholderText: '请输入邮编'}
  ];

  constructor(private searchValidateService: SearchValidateService,
              private router: Router,
              public subjectService: SubjectService,
              private message: NzMessageService,
              public utilService: UtilService,
              public confirmServ: NzModalService,
              public renderer: Renderer) {

  }

  ngOnInit() {
    $("#searchdown").click(function (event) {
      event.stopPropagation();
    });
    let data = JSON.parse(localStorage.getItem('currentQuery'));
    data = data || null;
    if (data) {
      this.queryTag = data.tag;
      this.queryParams = data.params;
      this.selectQueryType(this.queryTag.currentType, this.queryTag.currentTooltipType, this.queryTag.currentTypeName);
    } else {
      this.selectQueryType('keyword', 0, '超级查询');
    }

    this.tabsSubscription = this.subjectService.getObservable(SubjectKey.TABS).subscribe(data => {
      if (data) {
        this.queryTab = data._queryTab;
        this.queryParams = this.queryTab.params;
        this.queryTag = this.queryTab.tag;
        this.selectQueryType(this.queryTag.currentType, this.queryTag.currentTooltipType, this.queryTag.currentTypeName);
        this.publishData();
      }
    })

  };

  /**
   * 选择查询子标签
   * @param {string} type
   */
  selectQueryType(type: string, toolType: number, tagName: string) {
    this.queryTag.currentType = type;
    this.queryTag.currentTypeName = tagName;
    this.queryTag.currentTooltipType = toolType;
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
  }

  public info (config:any) {
    let _config = {
      okText:'确定'
    }
    _config = Object.assign(_config,config);
    this.confirmServ.info(_config);
  }

  queryByCondition() {
    this.queryTab.tag = this.queryTag;
    this.queryTab.params = this.queryParams;
    if (!this.queryParams[this.queryTag.currentType]) return;
    let isValidate = this.searchValidateService.validate(this.queryTag.currentType, this.queryParams[this.queryTag.currentType]);
    switch (this.queryTag.currentType) {
      case 'keyword' :
        if (!isValidate) {
          this.info({content : '关键字不少于两个字！'});
          return;
        }
        break;
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
      case 'toolsidcard':
        if (!isValidate) {
          this.info({content : '请输入正确的身份证！'});
          return;
        }
        break;
      case 'toolsdomain':
        break;
      default:
        break;
    }
    this.publishData();

  }

  public publishData() {
    this.utilService.resetQueryTabs(this.queryTab);
    localStorage.setItem('currentQuery', JSON.stringify(this.queryTab));
    this.subjectService.publish(SubjectKey.QUERY, {params: this.queryTab.params, tag: this.queryTab.tag});
    this.subjectService.publish(SubjectKey[this.queryTab.tag.currentType.toUpperCase()], 'loading');
    let type = this.queryTab.tag.currentType;
    let navigateUrl = 'data-list/' + type;
    this.router.navigate([navigateUrl]);
  }
}
