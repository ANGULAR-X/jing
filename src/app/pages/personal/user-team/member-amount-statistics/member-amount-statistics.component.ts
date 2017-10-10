import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {URLS} from "../../../../common/services/server.url";
import {variable} from "@angular/compiler/src/output/output_ast";

let that;
@Component({
  selector:'member-amount-statistics',
  templateUrl:'member-amount-statistics.component.html'
})

export class MemberAmountStatisticsComponent{
  public highChartData : any;
  constructor(public http:Http){
    that=this;
  }

  changeChartData(day){
    this.http.get(URLS.center.amount+'?day='+day).subscribe(res=>{
      if(res.json().code =='1'){
        console.log(res.json())
        var data = res.json().data;
        var objdata = data.resultList;
        var _categories = [];
        var _series1 = [];
        var _series2 = [];
        for (var i = 0; i < objdata.length; i++) {
          _categories.push(objdata[i]['name']);
          _series1.push(objdata[i]['total']);
          _series2.push(objdata[i]['count']);
        }
        this.highChartData = {
          chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)'
          },
          title: {
            text: '单位成员查询量TOP10',
            style: {
              color: '#CCC',//颜色
              fontSize: '14px'  //字体
            }
          },
          xAxis: {
            categories: _categories,
            style: {
              color: '#CCC',//颜色
              fontSize: '14px'  //字体
            }
          },
          yAxis: {
            min: 0,
            title: {
              text: '数据量 (条)',
              style: {
                color: '#ccc'
              }
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:f} 条</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: '<b style="color:#228eaf">查询条数</b>',
            data: _series1,
            color: '#228eaf'
          }, {
            name: '<b style="color:#FF9900">查询量</b>',
            data: _series2,
            color: '#FF9900'
          }]
        };
      }
    })
  }

  ngOnInit(){
   this.changeChartData(30);
  }
}
