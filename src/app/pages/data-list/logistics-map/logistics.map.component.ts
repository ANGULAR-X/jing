import {Component} from "@angular/core";
import {QueryTagModel} from "../../serarch/model/query-tag.model";
import {DataSearchService} from "../page/data.page.service";
import {QueryParamsModel} from "../../serarch/model/query-params.model";
import {SubjectKey, SubjectService} from "../../../common/services/subject.service";
import {URLS} from "../../../common/services/server.url";
import {PersonalService} from "../../personal/page/personal.service";
import {SearchParamsModal} from "../../personal/page/search.params.modal";
import {Http} from "@angular/http";
declare var AMap: any;


@Component({
  selector:'logistics-map',
  templateUrl:'logistics.map.component.html'
})

export class LogisticsMapComponent{
  public logisticsMapData:any;
  public tableData:any;
  public logisticsMapSubscription : any;
  public queryTag : QueryTagModel = new QueryTagModel();
  public queryParams : QueryParamsModel = new QueryParamsModel();
  public searchParams:SearchParamsModal =new SearchParamsModal();
  public isLoading : boolean = false;
  public queryObk:any;
  constructor(public http : Http,public subjectService : SubjectService,public dataSearchService : DataSearchService,public personalService:PersonalService) {
    this.searchParams.current=1;
    this.searchParams.pageSize=15;
    this.searchParams.pageNumber=1;
    this.queryTag.currentType = 'ipaddress';
    this.queryTag.currentTypeName = 'IP精准定位';
    this.queryTag.currentTooltipType = 0;
    this.fetchData();
  }

  ngOnInit() {
    this.logisticsMapSubscription = this.subjectService.getObservable(SubjectKey.LOGISTICSMAP).subscribe(data => {
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
    this.queryObk=this.queryParams;
    this.refreshData(this.searchParams);
    let url = URLS.search.logisticsmap+'?query='+encodeURI(this.queryParams['logisticsmap'])+'&rowNumPerPage=17&scrollId=1';
    this.dataSearchService.searchByParams(url,this.queryTag,this.queryParams).subscribe(res => {
      if (res.json().code == '1') {
        this.isLoading = false;
        this.logisticsMapData = res.json().data.resultList;
        this.findMap(this.logisticsMapData);
        // console.log(res.json().data)
      }
    })
  }

  refreshData(params:SearchParamsModal) {
    params.pageNumber = params.current;
    // this.searchParams.isLoading = true;
    this.http.get(URLS.search.logisticsmap+"?scrollId="+params.pageNumber+"&rowNumPerPage="+params.pageSize+"&query="+encodeURI(this.queryObk['logisticsmap'])).subscribe(res=>{
      if (res.json().code !='1'){
        // this.searchParams.isLoading = false;
        return
      }
      console.log(res.json().data)
      // this.searchParams.isLoading = false;
      this.tableData = res.json().data;
      this.searchParams.total = res.json().data.totalRowNum;
    })
  };

  //地图
  findMap(Obj){
    let content = '';
    let marker;
    let geocoder;
    var map = new AMap.Map('container',{
      zoom:5,
      // animateEnable: false
    });

    var lng="",lat="",linlng="",linlat="";
    map.plugin(['AMap.Geocoder', 'AMap.CircleEditor', 'AMap.PolyEditor', 'AMap.ToolBar', 'AMap.OverView', 'AMap.Scale'], function () {
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
      geocoder = new AMap.Geocoder({
        extensions: "all"
      });
      var n=0;
      //设置坐标点
      if (Obj) {
        for(var i=0;i<Obj.length;i++){
          // console.log('收件人'+mapdata[i].name+'地址'+mapdata[i].address+"-------寄件人"+mapdata[i].linkName+"地址"+mapdata[i].linkAddress);
          shoujian(Obj[i].name,(Obj[i].province+Obj[i].city+Obj[i].county+Obj[i].address),Obj[i].linkName,(Obj[i].linkProvince+Obj[i].linkCity+Obj[i].linkCounty+Obj[i].linkAddress));
          //    mapdata[i].address mapdata[i].linkAddress,mapdata[i].city,mapdata[i].linkCity
        }
      }
    });

    function shoujian(name,address,linkName,linkAddress) {
      geocoder.getLocation(address, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          lng=result.geocodes[0].location.lng;
          lat=result.geocodes[0].location.lat;
        }else {
          lng="";
          lat="";
        }
        jijian(linkName,linkAddress,name,lng,lat,address);
      });
    }

    function jijian(linkName,linkAddress,name,lng,lat,address) {
      geocoder.getLocation(linkAddress, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          linlng=result.geocodes[0].location.lng;
          linlat=result.geocodes[0].location.lat;
        }else{
          linlng='';
          linlat='';
        }

        huaxian(name,lng,lat,address,linkName,linlng,linlat,linkAddress);
      });
    }

    //2点画线
    function huaxian(name,lng,lat,address,linkName,linlng,linlat,linkAddress) {
      if (lng!=''&&lat!=''&&linlng!=''&&linlat!=''&&lng!=undefined&&lat!=undefined&&linlng!=undefined&&linlat!=undefined){
        // console.log(lng+"--"+lat+"--"+linlng+"---"+linlat)
        content = "<div class='logistics-markers'>"+ name+"</div>";
        marker = new AMap.Marker({
          position:[lng,lat],
          map: map,
          bubble: true,
          content: content
        });
        marker.setMap(map);

        content = "<div class='logistics-marker'>"+linkName+"</div>";
        marker = new AMap.Marker({
          position:[linlng,linlat],
          map: map,
          bubble: true,
          content: content
        });
        marker.setMap(map);

        var lineArr = [
          [linlng,linlat],
          [lng,lat]
        ];
        var polyline = new AMap.Polyline({
          path: lineArr,            // 设置线覆盖物路径
          strokeColor: '#C273FB',   // 线颜色
          strokeOpacity: 0.9,       // 线透明度
          strokeWeight: 2,          // 线宽
          strokeStyle: 'solid',     // 线样式
          strokeDasharray: [10, 5], // 补充线样式
          geodesic: true,           // 绘制大地线

        });
        polyline.setMap(map);
      }
    }
  }

}
