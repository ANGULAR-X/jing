/**
 * Created by front on 2017/9/26.
 */
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
declare var AMap: any;

let that;

@Component({
  selector: 'globe-map',
  templateUrl: './globe.map.component.html'
})

export class GlobeMapComponent implements OnInit {
  public location: any;
  constructor(private route: ActivatedRoute) {
    that = this;
    let locationStr = this.route.snapshot.queryParams['location'] || '';
    this.location = JSON.parse(locationStr);
  }

  ngOnInit() {
    let content = '';
    let marker;
    let map;
    let locationData = this.location;
    map = new AMap.Map('container', {
      zoom: 12,
      animateEnable: false
    });
    map.plugin('AMap.Geocoder', () => {
      let geolocation = new AMap.Geocoder({
        extensions: "all"
      });
      if (locationData['address']) {
        content = "<div class='my-marker'><p>姓名：无" + "</p><p>电话：" + locationData['phone'] + "</p><p>地址：" + locationData['address'] + "</p></div>";
        marker = new AMap.Marker({
          map: map,
          bubble: true,
          content: content
        });
        that.setMapMaker(geolocation, map, locationData['address'], marker);
        map.addControl(geolocation);
        return;
      }
    });
    map.plugin(['AMap.ToolBar', 'AMap.OverView', 'AMap.Scale'], function () {
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
      var overView = new AMap.OverView();
      overView.open();
      map.addControl(overView);
    })

  }

  public setMapMaker(geocoder: any, map: any, setMaker: any, marker: any) {
    geocoder.getLocation(setMaker, function (status, result) {
      if (status == 'complete' && result.geocodes.length) {
        if (marker) {
          marker.setPosition(result.geocodes[0].location);
          map.setCenter(marker.getPosition());
        }
      }
    });
  };
}
