import {Component} from "@angular/core";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {DataSearchService} from "../page/data.page.service";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {URLS} from "../../../common/services/server.url";
declare var AMap: any;


@Component({
  selector:'ipaddress-map',
  templateUrl:'ipaddress.map.component.html'
})

export class IpaddressMapComponent{
  public ipaddressData:any;
  public ipaddressSubscription : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public isLoading : boolean = false;
  constructor(public subjectService : SubjectService,public dataSearchService : DataSearchService) {
    this.queryTag.currentType = 'ipaddress';
    this.queryTag.currentTypeName = 'IP精准定位';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.ipaddressSubscription = this.subjectService.getObservable(SubjectKey.IPADDRESS).subscribe(data => {
      if (data) {
        this.fetchData();
      }
    });
  }
  fetchData(){
    this.isLoading = true;
    let data = JSON.parse(localStorage.getItem('currentQuery'));
    data = data || null;
    if (!data) return;
    this.queryParams = data.params;
    let url = URLS.search.ipaddress+'?ip='+encodeURI(this.queryParams['ipaddress']);
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == '1') {
        this.isLoading = false;
        this.ipaddressData = res.json().data.result;
        console.log(res.json().data)
        this.findMap(this.ipaddressData);
      }
    })
  }

  findMap(Obj){
    let content = '';
    let marker;
    let map = new AMap.Map('container',{
      // zoom: 17,
      animateEnable: false
    });
    map.plugin(['AMap.ToolBar', 'AMap.OverView', 'AMap.Scale'], function () {
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
    });
    let maps=Obj.multiareas;
    if(maps.length==1){
      map.setZoom(17);
    }else {
      map.setZoom(10);
    }
    if(maps){
      for (let i=0;i<maps.length;i++){
        let circle = new AMap.Circle({
          map:map,
          center:[maps[i].lng,maps[i].lat],
          radius:maps[i].radius.split('米')[0],  //表示半径的为多少米
          strokeColor:'#e80d0b',
          fillColor:'#EED4D1',
          strokeOpacity: 0.5,
          strokeStyle:'dashed',
          strokeWeight:'1',
          fillOpacity:'0.5'
        });
        circle.setMap(map);

        map.setCenter(new AMap.LngLat(maps[i].lng,maps[i].lat));

        content = "<div class='my-marker ip-marker' style='margin-left:0px;margin-top: -75px;'><p>地区" + (i+1) + "</p><p>位置："
          +maps[i].address + "</p><p>半径：" + maps[i].radius + "</p></div>";
        marker = new AMap.Marker({
          position:[maps[i].lng,maps[i].lat],
          map: map,
          bubble: true,
          content: content
        });
        marker.setMap(map);

      }
    }
  }
}
