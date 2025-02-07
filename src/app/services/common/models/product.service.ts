import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { create_product } from 'src/app/contracts/create_product';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list.product';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclientService : HttpClientService) { }

  create(product: create_product,  successCallBack? : any , errorCallBack? : (errorMessage:string) => void){
    this.httpclientService.post({
      controller : "products"
    },product).subscribe({
      complete: successCallBack,
      error: (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      }
    });

  }


  async read(page:number = 0, size:number = 5, successCallBack? : ()=> void, errorCallBack?:(errorMessage : string) => void) : Promise<List_Product[]> {
    const promiseData : Promise<List_Product[]> = firstValueFrom(this.httpclientService.get<List_Product[]>({
      controller :"products"
    }))

    promiseData.then(d => successCallBack())
    .catch((errorResponse:  HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
}
