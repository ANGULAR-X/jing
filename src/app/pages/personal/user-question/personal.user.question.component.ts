import {Component} from "@angular/core";
import {Http} from "@angular/http";
import {URLS} from "../../../common/services/server.url";
import {UserLoginService} from "../../../pages/user/user-login/user-login.service";
import { NzModalService } from 'ng-zorro-antd';


@Component({
  selector:"personal-user-question",
  templateUrl:"personal.user.question.component.html"
})

export class PersonalUserQuestionComponent{
  public userQus:any;
  public oldAnswer:any;
  public newAnswer:any;
  options  = [];
  selectedOption;
  constructor(public http:Http,public userLoginService : UserLoginService,public confirmServ: NzModalService){

  }

  question(){
    this.http.get(URLS.center.question).subscribe(res=>{
      if (res.json().code =='1'){
        this.userQus=res.json().data;
      }
    })
  }
  setQuestion(){
    this.http.get(URLS.center.questions).subscribe(res=>{
      if (res.json().code =='1'){
        for (var i=0;i<res.json().data.length;i++){
            this.options.push({value:res.json().data[i],label:res.json().data[i]})
        }
        this.selectedOption = this.options[ 0 ];
      }
    })
  }

  info(contentTpl) {
    this.confirmServ.info({
      okText:'确定',
      content: contentTpl
    });
  }
  setNewQuestion(){
    if (!this.oldAnswer&&!this.newAnswer){
      this.info("内容不能为空！");
      return
    }
    this.http.post(URLS.center.newsecurity+"?question="+this.userQus+'&newQuestion='+this.selectedOption.value+'&oldAnswer='+this.oldAnswer+'&newAnswer='+this.newAnswer,{}).subscribe(res=>{
      if(res.json().code!='1'){
        this.info(res.json().failure);
        return
      }
      this.userLoginService.logout();
    })
  }

  ngOnInit() {
    this.question();
    this.setQuestion();
  }
}
