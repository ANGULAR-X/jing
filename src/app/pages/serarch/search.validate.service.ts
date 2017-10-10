import { Injectable } from '@angular/core';

@Injectable()

export class SearchValidateService {
  public regex : any ={
    mobile : /^1[3|4|5|7|8][0-9]{9}$/,
    company : /^[\u4e00-\u9fa5_a-zA-Z]+$/,
    bankcard : /^(\d{16}|\d{19})$/,
    IP : /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
    chinese : /^[\u0391-\uFFE5]+$/,
    address : /^[\u4E00-\u9FA5]+[A-Za-z0-9]*/,
    qq : /^\d{5,13}$/,
    mobileCode : /^\d{4}$/,
    password : /^[a-z0-9!@#$%^&*()_+]{6,16}$/,
    email : /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
    number : /^\d$/,
    idCard : /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/
  }

  constructor(){}

  public validate (type : string,content : string) : any {
    switch (type) {
      case 'mobile':
      case 'logistics':
      case 'mobileAddress':
      case 'website':
      case 'logisticsmap':
        return this.regex.mobile.test(content) ? true : false;
      case 'company':
        if (content && content.length > 0) {
          return this.regex.company.test(content) ? true : false;
        }
        return false;
      case 'isBankCard' :
        return this.regex.bankcard.test(content) ? true : false;
      case 'toolsip':
      case 'ipaddress' :
        return this.regex.IP.test(content) ? true : false;

      case 'isChinese' :
        if (content && content.length >= 2) {
          return this.regex.chinese.test(content) ? true : false;
        }
        return false;
      case 'isAddress' :
        return this.regex.address.test(content) ? true : false;
      case 'keyword':
      case 'isNickname' :
        return content && content.length > 2 ? true : false;
      case 'isMobileCode' :
        return this.regex.mobileCode.test(content) ? true : false;
      case 'qqdata' :
        return this.regex.qq.test(content) ? true : false;
      case 'isPassword' :
        return this.regex.password.test(content) ? true : false;
      case 'isEmail' :
        return this.regex.email.test(content) ? true : false;
      case 'isNumber':
        return this.regex.number.test(content) ? true : false;
      case 'isIDcard':
      case 'toolsidcard':
        console.log(this.regex.idCard.test(content) ? true :false)
        return this.regex.idCard.test(content) ? true :false;
      case 'weibo':
        return content && content.length > 0 ? true : false;
    }
  }


}
