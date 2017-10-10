/**
 * Created by front on 2017/9/28.
 */
import {Component, OnInit} from '@angular/core';
import {DataSearchService} from "../page/data.page.service";
import {URLS} from "../../../common/services/server.url";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {Router} from "@angular/router";
import {QueryTabsModel} from "../../serarch/model/query-tabs.model";
import {SearchParamsModal} from "../../personal/page/search.params.modal";
import {NzModalService} from "ng-zorro-antd";

let that;

@Component({
  selector: 'super-query',
  templateUrl: './super.query.component.html',
  styles: [`
    :host ::ng-deep .ant-badge {
      margin-right: 5px;
    }
  `]
})

export class SuperQueryComponent implements OnInit {
  public keywordSubscription: any;
  public keywordData: any = new Object();
  public loadmoreData: any = new Object();
  public searchConditions: any = new Object();
  public leftMenuData: any;
  public queryTab: QueryTabsModel = new QueryTabsModel();
  public queryTag: QueryTagModel = new QueryTagModel();
  public queryParams: QueryParamsModel = new QueryParamsModel();
  public isLoading: boolean = false;
  style3 = {
    backgroundColor: '#87d068'
  };

  constructor(public router: Router, public confirmServ: NzModalService, public subjectService: SubjectService, public dataSearchService: DataSearchService) {
    this.queryTag.currentType = 'keyword';
    this.queryTag.currentTypeName = '超级查询';
    this.queryTag.currentTooltipType = 0;
    this.getLeftMenu();
    that = this;
  }

  ngOnInit() {
    this.keywordSubscription = this.subjectService.getObservable(SubjectKey.KEYWORD).subscribe(data => {
      if (data) {
        this.getLeftMenu();
      }
    });
  }

  public getLeftMenu() {
    this.dataSearchService.searchByParams(URLS.search.superQueryOfLeftMenu).subscribe(res => {
      if (res.json().code == 1) {
        this.leftMenuData = res.json().data;
        this.isLoading = true;
        if (res.json().code == 428 || res.json().code == 429) {
          this.confirmServ.warning({
            content: '您的设备已在其他地方登陆！',
            onOk: that.logout
          });
          return;
        }
        for (let key in this.leftMenuData) {
          for (let m = 0; m < this.leftMenuData[key].length; m++) {
            if (!this.searchConditions[this.leftMenuData[key][m].type]) {
              let searchParam = new SearchParamsModal();
              searchParam.pageSize = 50;
              searchParam.pageNumber = 1;
              searchParam.isLoading = false;
              searchParam.loadmoreInfo = '加载更多';
              this.searchConditions[this.leftMenuData[key][m].type] = searchParam;
            }
            this.searchByType(this.leftMenuData[key][m]);
            if (m == this.leftMenuData[key].length - 1) {
              this.isLoading = false;
            }
          }
        }
      }
    })
  };

  searchByType(k) {
    let data = JSON.parse(localStorage.getItem('currentQuery'));
    data = data || null;
    if (!data) return;
    this.queryTab = data;
    //13123456789
    let url = URLS.search.superQueryOfRight + k.index + '/types/' + k.type + '?rowNumPerPage=50&query='
      + encodeURI(this.queryTab.params['keyword']) + '&scrollId=' + 1;
    this.dataSearchService.searchByParams(url).subscribe(res => {
      if (res.json().code == 1) {
        this.keywordData[k.type] = res.json().data;
        this.searchConditions[k.type].total = res.json().data.totalRowNum;
        if (this.keywordData[k.type].resultList.length == res.json().data.totalRowNum) {
          this.searchConditions[k.type].loadmoreInfo = '没有更多数据了';
        } else {
          this.searchConditions[k.type].pageNumber++;
        }
      } else {
        this.keywordData[k.type] = {};
      }
    })
  }

  /**
   * 分块加载更多数据
   * @param m
   */
  public loadmore(m) {
    if (this.searchConditions[m.type].total == this.keywordData[m.type].resultList.length) return;
    let data = JSON.parse(localStorage.getItem('currentQuery'));
    data = data || null;
    if (!data) return;
    this.queryTab = data;
    this.searchConditions[m.type].isLoading = true;
    this.searchConditions[m.type].loadmoreInfo = '加载中...';
    let url = URLS.search.superQueryOfRight + m.index + '/types/' + m.type + '?rowNumPerPage='
      + this.searchConditions[m.type].pageSize + '&query=' + encodeURI(this.queryTab.params['keyword'])
      + '&scrollId=' + this.searchConditions[m.type].pageNumber;
    this.dataSearchService.searchByParams(url).subscribe(res => {
      if (res.json().code == 1) {
        let _ary = new Array<any>();
        _ary = this.keywordData[m.type].resultList;
        this.keywordData[m.type].resultList = _ary.concat(res.json().data.resultList);
        if (this.keywordData[m.type].resultList.length == res.json().data.totalRowNum) {
          this.searchConditions[m.type].loadmoreInfo = '没有更多数据了';
        } else {
          this.searchConditions[m.type].pageNumber++;
          this.searchConditions[m.type].loadmoreInfo = '加载中...';
        }
      } else {
        this.searchConditions[m.type].loadmoreInfo = '没有更多数据了';
      }
      this.searchConditions[m.type].isLoading = false;
    })
  }

  public gotoTarget(type, event) {
    var $tg = $('#box' + type);
    $('.slistbox li').removeClass('active');
    $(event.target).addClass('active');
    if ($tg.length > 0) {
      $("html,body").animate({scrollTop: $tg.offset().top - 105}, 1000);
    }
  }

  navigateToViewByUrl(keyword: string) {
    this.queryTab.params[this.queryTab.tag.currentType] = keyword;
    this.subjectService.publish(SubjectKey.TABS, {_queryTab: this.queryTab});
  }


  ngOnDestroy() {
    if (this.keywordSubscription) {
      this.keywordSubscription.unsubscribe();
    }
  }

  logout() {
    localStorage.clear();
    setTimeout(() => {
      window.open("http://127.0.0.1:4200/login", '_self');
    }, 300);
  }
}
