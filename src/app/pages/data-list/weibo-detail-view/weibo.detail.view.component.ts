/**
 * Created by front on 2017/9/27.
 */
import {Component, OnInit} from '@angular/core';
import {DataSearchService} from "../page/data.page.service";
import {URLS} from "../../../common/services/server.url";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'weibo-detail',
  templateUrl: './weibo.detail.view.component.html'
})

export class WeiboDetailViewComponent implements OnInit {
  public weiboDeatail : any;
  public isLoading : boolean = false;
  constructor(private route : ActivatedRoute,public dataSearchService : DataSearchService) {
    let userId = this.route.snapshot.queryParams['userId'] || '';
    this.getWeiboDetailById(userId);
  }

  ngOnInit() {

  }

  public getWeiboDetailById (id : string) {
    if (!id) return;
    this.isLoading = true;
    let url = URLS.search.weiboDetail + '?id=' + id;
    this.dataSearchService.searchByParams(url).subscribe(res => {
      if (res.json().code == 1) {
        this.isLoading = false;
        this.weiboDeatail = res.json().data.result;
      }
    })
  }
}
