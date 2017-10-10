/**
 * Created by front on 2017/9/24.
 */
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {QueryParamsModel} from "../../serarch/model/query-params.model";

@Injectable()
export class DataSearchService {

  constructor(public http : Http) {
  }

  public searchByParams(url:string,tag?:QueryTagModel,params?:QueryParamsModel):Observable<any>{
    return this.http.get(url);
  }
}
