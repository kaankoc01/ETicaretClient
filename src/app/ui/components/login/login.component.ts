import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private userService : UserService , private authService : AuthService, private activatedRoute : ActivatedRoute, private router : Router){}

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
}
