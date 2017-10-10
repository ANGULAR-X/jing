import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";

export enum SubjectKey {
  LOGIN_STAT,
  VERIFICATIONCODE,
  QUERY,
  TABS,
  QUERYPARAMS,
  QUERYTAG,
  LOGISTICS,
  MOBILEADDRESS,
  WEIBO,
  WEBSITE,
  QQDATA,
  TOOLSIP,
  TOOLSVIN,
  TOOLSIDCARD,
  TOOLSDOMAIN,
  TOOLSZIP,
  IPADDRESS,
  LOGISTICSMAP,
  KEYWORD,
  COMPANY
}

@Injectable()
export class SubjectService {

  public loginSubject : Subject<any> = new Subject<any>();
  public loginSubjectObs$ = this.loginSubject.asObservable();

  public verificationSubject : Subject<any> = new Subject<any>();
  public verificationObs$ = this.verificationSubject.asObservable();

  public queryParamsSubject : Subject<any> = new Subject<any>();
  public queryParamsObs$ = this.queryParamsSubject.asObservable();

  public queryTagSubject : Subject<any> = new Subject<any>();
  public queryTagObs$ = this.queryTagSubject.asObservable();

  public querySubject : Subject<any> = new Subject<any>();
  public queryObs$ = this.querySubject.asObservable();

  public tabsSubject : Subject<any> = new Subject<any>();
  public tabsObs$ = this.tabsSubject.asObservable();

  public logisticsSubject : Subject<any> = new Subject<any>();
  public logisticsObs$ = this.logisticsSubject.asObservable();

  public mobileAddressSubject : Subject<any> = new Subject<any>();
  public mobileAddressObs$ = this.mobileAddressSubject.asObservable();

  public weiboSubject : Subject<any> = new Subject<any>();
  public weiboObs$ = this.weiboSubject.asObservable();

  public websiteSubject : Subject<any> = new Subject<any>();
  public websiteObs$ = this.websiteSubject.asObservable();

  public qqSubject : Subject<any> = new Subject<any>();
  public qqObs$ = this.qqSubject.asObservable();

  public toolsIpSubject : Subject<any> = new Subject<any>();
  public toolsIpObs$ = this.toolsIpSubject.asObservable();

  public toolsvinSubject : Subject<any> = new Subject<any>();
  public toolsvinObs$ = this.toolsvinSubject.asObservable();

  public toolsidcardSubject : Subject<any> = new Subject<any>();
  public toolsidcardObs$ = this.toolsidcardSubject.asObservable();

  public toolsdomainSubject : Subject<any> = new Subject<any>();
  public toolsdomainObs$ = this.toolsdomainSubject.asObservable();

  public toolszipSubject : Subject<any> = new Subject<any>();
  public toolszipObs$ = this.toolszipSubject.asObservable();

  public ipaddressSubject : Subject<any> = new Subject<any>();
  public ipaddressObs$ = this.ipaddressSubject.asObservable();

  public logisticsmapSubject : Subject<any> = new Subject<any>();
  public logisticsmapObs$ = this.logisticsmapSubject.asObservable();

  public keywordSubject : Subject<any> = new Subject<any>();
  public keywordObs$ = this.keywordSubject.asObservable();

  public companySubject : Subject<any> = new Subject<any>();
  public companyObs$ = this.companySubject.asObservable();

  constructor (public http : Http) {}

  publish (key : SubjectKey, data : any) {
    switch (key) {
      case SubjectKey.LOGIN_STAT:
        this.loginSubject.next(data);
        break;
      case SubjectKey.VERIFICATIONCODE:
        this.verificationSubject.next(data);
        break;
      case SubjectKey.QUERYPARAMS:
        this.queryParamsSubject.next(data);
        break;
      case SubjectKey.QUERYTAG:
        this.queryTagSubject.next(data);
        break;
      case SubjectKey.QUERY:
        this.querySubject.next(data);
        break;
      case SubjectKey.TABS:
        this.tabsSubject.next(data);
        break;
      case SubjectKey.LOGISTICS:
        this.logisticsSubject.next(data);
        break;
      case SubjectKey.MOBILEADDRESS:
        this.mobileAddressSubject.next(data);
        break;
      case SubjectKey.WEIBO:
        this.weiboSubject.next(data);
        break;
      case SubjectKey.WEBSITE:
        this.websiteSubject.next(data);
        break;
      case SubjectKey.QQDATA:
        this.qqSubject.next(data);
        break;
      case SubjectKey.TOOLSIP:
        this.toolsIpSubject.next(data);
        break;
      case SubjectKey.TOOLSVIN:
        this.toolsvinSubject.next(data);
        break;
      case SubjectKey.TOOLSIDCARD:
        this.toolsidcardSubject.next(data);
        break;
      case SubjectKey.TOOLSDOMAIN:
        this.toolsdomainSubject.next(data);
        break;
      case SubjectKey.TOOLSZIP:
        this.toolszipSubject.next(data);
        break;
      case SubjectKey.IPADDRESS:
        this.ipaddressSubject.next(data);
        break;
      case SubjectKey.LOGISTICSMAP:
        this.logisticsmapSubject.next(data);
        break;
      case SubjectKey.KEYWORD:
        this.keywordSubject.next(data);
        break;
      case SubjectKey.COMPANY:
        this.companySubject.next(data);
        break;
      default:
        break;
    }
  }

  getObservable(key : SubjectKey):Observable<any>{
    switch (key) {
      case SubjectKey.LOGIN_STAT:
        return this.loginSubjectObs$;
      case SubjectKey.VERIFICATIONCODE:
        return this.verificationObs$;
      case SubjectKey.QUERYPARAMS:
        return this.queryParamsObs$;
      case SubjectKey.QUERYTAG:
        return this.queryTagObs$;
      case SubjectKey.QUERY:
        return this.queryObs$;
      case SubjectKey.TABS:
        return this.tabsObs$;
      case SubjectKey.LOGISTICS:
        return this.logisticsObs$;
      case SubjectKey.MOBILEADDRESS:
        return this.mobileAddressObs$;
      case SubjectKey.WEIBO:
        return this.weiboObs$;
      case SubjectKey.WEBSITE:
        return this.websiteObs$;
      case SubjectKey.QQDATA:
        return this.qqObs$;
      case SubjectKey.TOOLSIP:
        return this.toolsIpObs$;
      case SubjectKey.TOOLSVIN:
        return this.toolsvinObs$;
      case SubjectKey.TOOLSIDCARD:
        return this.toolsidcardObs$;
      case SubjectKey.TOOLSDOMAIN:
        return this.toolsdomainObs$;
      case SubjectKey.TOOLSZIP:
        return this.toolszipObs$;
      case SubjectKey.IPADDRESS:
        return this.ipaddressObs$;
      case SubjectKey.LOGISTICSMAP:
        return this.logisticsmapObs$;
      case SubjectKey.KEYWORD:
        return this.keywordObs$;
      case SubjectKey.COMPANY:
        return this.companyObs$;
      default:
        break;
    }
    return null;
  }


}
