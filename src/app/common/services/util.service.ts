import {Injectable} from '@angular/core';
import {QueryParamsModel} from "../../pages/serarch/model/query-params.model";
import {QueryTagModel} from "../../pages/serarch/model/query-tag.model";
import {QueryTabsModel} from "../../pages/serarch/model/query-tabs.model";

@Injectable()
export class UtilService {
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public queryTag : QueryTagModel = new QueryTagModel();

  setQueryParams(params : QueryParamsModel){
    this.queryParams = params;
  }

  setQueryTag (queryTag : QueryTagModel) {
    this.queryTag = queryTag;
  }

  getQueryParams():QueryParamsModel{
    return this.queryParams;
  }
  getQueryTag():QueryTagModel{
    return this.queryTag;
  }

  resetQueryTabs (queryTab : QueryTabsModel) {
    let queryTabs : any;
    queryTabs = JSON.parse(localStorage.getItem('queryTabs'));
    queryTabs = queryTabs || [];
    if (queryTabs.length > 0) {
      for (let q = 0; q < queryTabs.length; q++) {
        let isSameTag = queryTab.tag.currentType == queryTabs[q].tag.currentType;
        let isSameQueryValue = queryTab.params[queryTab.tag.currentType] == queryTabs[q].params[queryTab.tag.currentType];
        if (isSameTag && isSameQueryValue) {
          return;
        }
      }
    }
    queryTabs.push(queryTab);
    localStorage.setItem('queryTabs',JSON.stringify(queryTabs));
  }

  getCurrentQueryTabs () {
    let currentQueryTabs : any;
    currentQueryTabs = JSON.parse(localStorage.getItem('queryTabs'));
    currentQueryTabs = currentQueryTabs || [];
    return currentQueryTabs;
  }


}
