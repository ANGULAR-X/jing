import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {URLS} from "../../../common/services/server.url";
let that;

@Component({
  selector:'personal-right-data-view',
  templateUrl:'./personal.right.data.view.component.html'
})
export class PersonalRightDataViewComponent{
  public tableDate:any;

  constructor(
    public http:Http){
    that = this;
  }

  ngOnInit() {
    this.http.get(URLS.center.data).subscribe(res=>{
      if(res.json().code=='1'){
          console.log(res.json())
        this.tableDate=res.json().data;
      }
    })
  }

}
