/**
 * Created by front on 2017/9/24.
 */
import {Component, OnInit} from '@angular/core';
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {UtilService} from "../../../common/services/util.service";
import {Router} from "@angular/router";
import {QueryTabsModel} from "../../serarch/model/query-tabs.model";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";

@Component({
  selector: 'search-tabs',
  templateUrl: './search.tabs.component.html'
})

export class SearchTabsComponent implements OnInit {
  public tabs: any;
  public queryParams: QueryParamsModel;
  public currentTab: any;
  public currentTabIndex: number = 0;
  public currentUser: any;

  public querySubscription: any;

  constructor(public router: Router,
              public subjectService: SubjectService,
              public utilService: UtilService) {
    this.getCurrentTabIndex();
  }

  closeTab(tab) {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
    localStorage.setItem('queryTabs', JSON.stringify(this.tabs));
  };


  ngOnInit() {
    this.querySubscription = this.subjectService.getObservable(SubjectKey.QUERY).subscribe(data => {
      if (data) {
        this.getCurrentTabIndex();
      }
    }, error => {
      console.error(error);
    });
  }

  getCurrentTabIndex () {
    this.currentTab = JSON.parse(localStorage.getItem('currentQuery')) || {};
    this.tabs = this.utilService.getCurrentQueryTabs();
    for (let t = 0; t < this.tabs.length; t++) {
      let isSameValue = this.tabs[t].tag.currentType == this.currentTab.tag.currentType;
      let isSameKey = this.tabs[t].params[this.currentTab.tag.currentType] == this.currentTab.params[this.currentTab.tag.currentType];
      if (isSameValue && isSameKey) {
        this.currentTabIndex = t;
        break;
      }
    }
  }

  navigateToViewByUrl(queryTab: QueryTabsModel) {
    this.subjectService.publish(SubjectKey.TABS, {_queryTab: queryTab});
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}

