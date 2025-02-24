import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { Create_User } from 'src/app/contracts/users/create_user';
import { first, firstValueFrom, Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';


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


}
