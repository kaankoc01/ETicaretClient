import { FacebookLoginProvider, SocialAuthService , SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private userAuthService : UserAuthService , private authService : AuthService, private activatedRoute : ActivatedRoute, private router : Router , private socialAuthService: SocialAuthService){
    socialAuthService.authState.subscribe(async( user : SocialUser) => {
      console.log(user);
      switch(user.provider){
        case "GOOGLE" :
          await userAuthService.googleLogin(user, ()=> {
            this.authService.identityCheck();
          })
          break;
        case "FACEBOOK" :
          await userAuthService.facebookLogin(user,() => {
            this.authService.identityCheck();
          });
          break;
      }
    });

  }

  async login(usernameOrEmail : string , password : string){
   await this.userAuthService.login(usernameOrEmail,password , () => {
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
