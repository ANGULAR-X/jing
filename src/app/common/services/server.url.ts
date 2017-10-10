// let baseUrl = 'http://192.168.0.129:8080/devplat';
let baseUrl = 'http://192.168.0.124:8068/devplat';


this.baseUrl = baseUrl;

export const URLS = {
  user: {
    login: this.baseUrl + '/api/v1/login',
    loginOut: this.baseUrl + '/api/v1/logout',
    imgCode: this.baseUrl + '/verificationCode.jpg',
    security: this.baseUrl + '/users/settings/security/verify',
    profile : this.baseUrl + '/users/settings/profile',
    mobileCodeVerify: this.baseUrl + '/users/account/verify',
    smsVerify: this.baseUrl + '/users/sms/verify'
  },
  center: {
    info: this.baseUrl + '/api/v1/users/current',
    paylist: this.baseUrl + '/api/v1/readChargingLoggerAll',
    data: this.baseUrl + '/api/v1/charging/balance',
    loglogin: this.baseUrl + '/api/v1/userLoginLogs',
    searchlog: this.baseUrl + '/api/v1/userAccessLogs',
    question: this.baseUrl + '/api/v1/users/settings/security/question',
    questions: this.baseUrl + '/api/v1/users/security/questions',
    newsecurity: this.baseUrl + '/api/v1/users/settings/newsecurity',
    changePwd: this.baseUrl + '/api/v1/users/settings/newpassword',
    //成员管理
    amount: this.baseUrl + '/api/v1/adminlog/culogaccesslist',
    member: this.baseUrl + '/api/v1/adminlog/culist',
    userlist: this.baseUrl + '/api/v1/adminlog/userlist',
    userdelete: this.baseUrl + '/api/v1/adminlog/deleteunitmember',
    userlogin: this.baseUrl + '/api/v1/adminlog/culogininfo',
    userdetails: this.baseUrl + '/api/v1/adminlog/culogininfodetail',
    userlog: this.baseUrl + '/api/v1/adminlog/culoglist',
  },
  search: {
    qqdata: this.baseUrl + '/qqSearch',
    logistics: this.baseUrl + '/api/v1/thirdpart/logistics/realtime',
    // logisticsMap: this.baseUrl + '/labels/indices/financial/types/logistics',
    mobileAddress: this.baseUrl + '/api/v1/thirdpart/mobiles/query',
    website: this.baseUrl + '/api/v1/thirdpart/mobiles/analysisapp',
    microblog: this.baseUrl + '/api/v1/thirdpart/socialization/microblog/username',
    weiboDetail: this.baseUrl + '/api/v1/thirdpart/socialization/microblog/userid',
    ipaddress : this.baseUrl+'/api/v1/thirdpart/location/ipdetailed',
    logisticsmap:this.baseUrl+'/labels/indices/financial/types/logistics',
    //小工具
    toolip: this.baseUrl + '/api/v1/thirdpart/tools/ip/info',
    toolsvin: this.baseUrl + '/api/v1/thirdpart/tools/frame/carinfo',
    toolsidcard: this.baseUrl + '/api/v1/thirdpart/tools/idcard/info',
    toolsdomain: this.baseUrl + '/api/v1/thirdpart/tools/domain/info',
    toolszip: this.baseUrl + '/api/v1/thirdpart/tools/zipcode/info',
    superQueryOfLeftMenu: this.baseUrl + '/api/v1/labels/label',
    superQueryOfRight : this.baseUrl + '/labels/indices/',
    //工商
    company:this.baseUrl+'/api/v1/thirdpart/business/fuzzy',
    preciseType : this.baseUrl + '/api/v1/metadatas/indices/types/all',
    preciseTwo : this.baseUrl + '/api/v1/metadatas/indices/'
  }
};
