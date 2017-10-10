import {InterceptedRequest, InterceptedResponse, Interceptor} from "ng2-interceptors";
import {NzModalService} from "ng-zorro-antd";
import {Injectable, Injector} from "@angular/core";
import {Router} from "@angular/router";
import {Http} from "@angular/http";

let that;

@Injectable()
export class ServerURLInterceptor implements Interceptor {
  private http: Http;
  private router : Router;

  constructor(public injector:Injector,public confirmServ: NzModalService) {
    setTimeout(() => {
      this.http = injector.get(Http);
      this.router = injector.get(Router);
    });
    that = this;
  }

  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    let headers = request.options.headers || new Headers();
    let accessToken = localStorage.getItem("accessToken");
    let oldAccessToken = headers.get('accessToken');
    if (!headers.get('Content-Type')) {
      headers.append('Content-Type', 'application/json');
    }
    if (!oldAccessToken && accessToken) {
      headers.append('accessToken', accessToken);
    }
    if (oldAccessToken && oldAccessToken != accessToken) {
      headers.delete('accessToken');
      headers.append('accessToken', accessToken);
    }
    return request;
  }

  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    let _response: any;
    let body: any;
    _response = response.response;
    console.log(response);
    if (Object.prototype.toString.call(_response._body) == "[object String]") {
      body = JSON.parse(_response._body);
      if (body && (body.code == 428 || body.code == 429)) {
        this.confirmServ.warning({
          content: JSON.parse(_response._body).failure,
          onOk: that.logout
        });
      }
    }
    return response;
  }

  /**
   * 退出登录
   */
  public logout(): void {
    localStorage.clear();
    console.log('da');
    setTimeout(() => {
      window.open("http://127.0.0.1:4200/login",'_self');
    }, 500);
    // that.router.navigateByUrl("/login");
  }
}
