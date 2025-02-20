import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/common/models/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private userService : UserService){}

  ngOnInit(): void {
    throw new Error();
  }

  async login(usernameOrEmail : string , password : string){
   await this.userService.login(usernameOrEmail,password );
  }
}
