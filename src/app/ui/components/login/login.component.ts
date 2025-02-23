import { FacebookLoginProvider, SocialAuthService , SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenResponse } from 'src/app/contracts/token/tokenReponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private userService : UserService , private authService : AuthService, private activatedRoute : ActivatedRoute, private router : Router , private socialAuthService: SocialAuthService){
    socialAuthService.authState.subscribe(async( user : SocialUser) => {
      console.log(user);
      switch(user.provider){
        case "GOOGLE" :
          await userService.googleLogin(user, ()=> {
          })
          break;
        case "FACEBOOK" :
          await userService.facebookLogin(user,() => {
          });
          break;
      }
    });
    this.authService.identityCheck();
  }

  async login(usernameOrEmail : string , password : string){
   await this.userService.login(usernameOrEmail,password , () => {
    this.authService.identityCheck();
    this.activatedRoute.queryParams.subscribe(params => {
     const returnUrl : string =  params["returnUrl"];
     if(returnUrl)
     {
      this.router.navigate([returnUrl]);
     }
    });
   });
  }

  facebookLogin(){
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  }
}
