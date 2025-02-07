import { Component, OnInit, ViewChild } from '@angular/core';
import { create_product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService : HttpClientService) { }

  ngOnInit(): void {
  }

  @ViewChild(ListComponent) listComponents : ListComponent
  createdProduct(createdProduct : create_product){
    this.listComponents.getProducts();
  }

}
