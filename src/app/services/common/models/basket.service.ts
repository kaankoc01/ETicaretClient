import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { first, firstValueFrom, Observable, retry } from 'rxjs';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { Update_Basket_Items } from 'src/app/contracts/basket/update_basket_item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpCLientService : HttpClientService) { }

  async get() : Promise<List_Basket_Item[]>{
  const observable : Observable<List_Basket_Item[]>  = this.httpCLientService.get({
    controller : "baskets",
  });
  return await firstValueFrom(observable);
  }

  async add(basketItem : Create_Basket_Item) : Promise<void>{
   const observable : Observable<any> =  this.httpCLientService.post({
      controller : "baskets"
    },basketItem);
  await firstValueFrom(observable)
  }

  async updateQuantity(basketItem : Update_Basket_Items) : Promise<any>{
    const observable : Observable<any> = this.httpCLientService.put({
      controller : "baskets"
    },basketItem);
    await firstValueFrom(observable)
  }
  async remove(basketItemId : string) : Promise<void>{
    const observable : Observable<any> = this.httpCLientService.delete({
      controller : "baskets"
    },basketItemId)
    await firstValueFrom(observable)
  }

}
