import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { create_product } from 'src/app/contracts/create_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpclientService : HttpClientService) { }

  create(product: create_product, p0: () => void){
    this.httpclientService.post({
      controller : "products"

    },product).subscribe(result =>{
      alert("başarili")
    });
  }
}
