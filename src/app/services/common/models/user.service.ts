import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from 'src/app/contracts/token/tokenReponse';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientservice : HttpClientService , private toastrService : CustomToastrService) { }

  async create(user : User) : Promise<Create_User>
  {
   const observable : Observable<Create_User | User> = this.httpClientservice.post<Create_User | User>({
      controller :"users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail: string, password: string, p0?: () => void) : Promise<any>{
   const observable : Observable<any | TokenResponse> =  this.httpClientservice.post<any | TokenResponse>({
      controller : "users",
      action: "login"
    },{ usernameOrEmail , password})

   const tokenReponse : TokenResponse =  await firstValueFrom(observable) as TokenResponse;
   if(tokenReponse){
    localStorage.setItem("accessToken", tokenReponse.token.accessToken);
    this.toastrService.message("Kullanıcı girişi başarıyla sağlanmıştır." , "Giriş Başarılı" , {
    messageType : ToastrMessageType.Success,
    position : ToastrPosition.TopRight
    })
  }
  }
  async googleLogin(user : SocialUser , callBackFunction? : () => void) : Promise<any>{
   const observable : Observable<SocialUser | TokenResponse> = this.httpClientservice.post<SocialUser | TokenResponse>({
      action : "google-login",
      controller : "users"
    },user);
  const tokenResponse : TokenResponse =  await firstValueFrom(observable) as TokenResponse;
  if(tokenResponse){
    localStorage.setItem("accessToken",tokenResponse.token.accessToken);
    this.toastrService.message("Google üzerinden giriş başarılı","Giriş Bşaarılı", {
      messageType : ToastrMessageType.Success,
      position : ToastrPosition.TopRight
    });
  }
callBackFunction();
  }


  async facebookLogin(user: SocialUser, callBackFunction? : () => void) : Promise<any>{
const observable : Observable<SocialUser | TokenResponse> = this.httpClientservice.post<SocialUser | TokenResponse>({
  controller:"users",
  action : "facebook-login"
    },user);
   const tokenReponse : TokenResponse =  await firstValueFrom(observable) as TokenResponse;
   if(tokenReponse){
    localStorage.setItem("accessToken", tokenReponse.token.accessToken);
    this.toastrService.message("facebook üzerinden giriş başarıyla sağlandı", "Giriş Başarılı", {
      messageType:ToastrMessageType.Success,
      position : ToastrPosition.TopRight
    })
   }
    callBackFunction();
  }
}
