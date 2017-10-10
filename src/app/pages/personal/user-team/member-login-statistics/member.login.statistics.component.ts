import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {URLS} from "../../../../common/services/server.url";

@Component({
  selector:'member-login-statistics',
  templateUrl:'member.login.statistics.component.html'
})

export class MemberLoginStatisticsComponent{
  public highChartData:any;
    constructor(public http:Http){

    }

  changeChartLoginData(day){
      console.log(day)
    this.http.get(URLS.center.userlogin+"?type="+day).subscribe(res=>{
      if (res.json().code == '1') {
        var data = res.json().data;
        var _tmpAry = data.resultList;
        var _chartData = [];
        var i = 0;
        for (; i < _tmpAry.length; i++) {
          _chartData.push({name: _tmpAry[i]['realName'], y: _tmpAry[i]['num']});
        }
        this.highChartData = {
          chart: {
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)'
          },
          title: {
            text: '单位成员登录次数Top10',
            style: {
              color: '#CCC',//颜色
              fontSize: '14px'  //字体
            }
          },
          subtitle: {
            text: ''
          },
          xAxis: {
            type: 'category'
          },
          yAxis: {
            title: {
              text: ''
            }
          },
          legend: {
            enabled: false
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: '{point.y}次',
                style: {
                  color: '#CCC'
                }
              }
            }
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}次</b><br/>'
          },
          series: [{
            name: '登录次数统计',
            colorByPoint: true,
            data: _chartData
          }]
        };
      }
    })
  }
  ngOnInit(){
    this.changeChartLoginData(30);
  }
}
