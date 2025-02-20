import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { first, firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientservice : HttpClientService) { }

  async create(user : User) : Promise<Create_User>
  {
   const observable : Observable<Create_User | User> = this.httpClientservice.post<Create_User | User>({
      controller :"users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }

  async login(usernameOrEmail : string , password: string , callBackFunction? : () => void) : Promise<void>{
   const observable : Observable<any> =  this.httpClientservice.post({
      controller : "users",
      action: "login"
    },{ usernameOrEmail , password})

    await firstValueFrom(observable);
    callBackFunction;

  }
}
