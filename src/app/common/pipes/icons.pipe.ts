/**
 * Created by front on 2017/9/27.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'icons'
})

export class IconsPipe implements PipeTransform {
  public iconsObj = {
    logistics: 'icon-wuliu',
    bocaioriginal: 'icon-bocaixitongguanli',
    elder: 'icon-laoren',
    accumulationfund: 'icon-gongjijin',
    motherandbady: 'icon-youpinwangtubiao',
    healthproducts: 'icon-baojianpin',
    account: 'icon-accounts',
    accountjd: 'icon-jingdong',
    accountht: 'icon-taiwan',
    email: 'icon-youxiangzhaohui',
    car: 'icon-qiche',
    house: 'icon-jiudian1',
    business: 'icon-gongshang',
    student: 'icon-xuesheng',
    telecom: 'icon-shouji',
    internet: 'icon-none',
    contact: 'icon-txl',
    hotel: 'icon-jiudian1',
    hospital: 'icon-333',
    finance: 'icon-jinrong',
    airplane: 'icon-jipiao',
    resume: 'icon-tubiao314',
    cybercafe: 'icon-wangba',
    socialsecurity: 'icon-shebao',
    qqdata: 'icon-tubiao215',
    qqqundata: 'icon-qun',
    qqqunrelation: 'icon-ots',
    qualification: 'icon-tubiao215'
  };

  transform(value: any, ...args: any[]): any {
    return this.iconsObj[value];
  }
}
