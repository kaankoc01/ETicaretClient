import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService : HttpClientService) { }

  ngOnInit(): void {
    this.httpClientService.get<Product[]>({
      controller : "products"
    }).subscribe(data => { console.log(data)});

  //  this.httpClientService.post({
  //    controller:"products"
  //  },{
  //    name:"Kalem",
  //    Stock:100,
  //    price:15
  //  }).subscribe();

//  this.httpClientService.put({
//    controller:"products",
//  },{
//    id :"0194d764-5483-7cb6-a235-0418d557c2cd",
//    name: "Beyaz A4",
//    Stock:11100,
//    price:123
//  }).subscribe();

  //  this.httpClientService.delete({
  //    controller : "products"
  //  },"0194d763-793b-74e2-8ed8-15bc7065e1eb")
  //  .subscribe();


 // this.httpClientService.get({
 //   fullEndPoint : "https://jsonplaceholder.typicode.com/posts"
 // }).subscribe(data => console.log(data));

  }

}
