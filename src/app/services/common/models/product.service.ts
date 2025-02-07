import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { create_product } from 'src/app/contracts/create_product';
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


  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallback?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; products: List_Product[] }> {
    try {
      const data = await firstValueFrom(
        this.httpclientService.get<{ totalCount: number; products: List_Product[] }>({
          controller: "products",
          queryString: `page=${page}&size=${size}`
        })
      );

      if (successCallBack) successCallBack();
      return data;
    } catch (errorResponse: unknown) { // Catch clause variable type annotation must be 'any' or 'unknown'
      if (errorResponse instanceof HttpErrorResponse) {
        if (errorCallback) errorCallback(errorResponse.message);
      } else {
        if (errorCallback) errorCallback("Beklenmeyen bir hata oluştu.");
      }
      throw errorResponse;
    }
  }


 }

