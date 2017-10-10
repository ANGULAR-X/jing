export class UserModel {
  id : number;
  uuid:string;
  account : string;
  nickName: string;
  password: string;
  remeberMe:boolean;
  email: string;
  confirmPassword: string;
  verificationCode:string;
  answer:string;
  validateStatus : boolean;
  errorSecurity : string;
}
