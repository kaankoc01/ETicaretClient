import { Component, OnInit } from '@angular/core';
import { create_product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private productService :ProductService ,private alertify : AlertifyService) { }

  ngOnInit(): void {
  }
  create(name:HTMLInputElement,stock:HTMLInputElement, price:HTMLInputElement ){
    const create_Product : create_product = new create_product
    create_Product.name = name.value;
    create_Product.stock = parseInt(stock.value);
    create_Product.price = parseFloat(price.value)

    this.productService.create(create_Product, () => {
      this.alertify.message("ürün başarıyla eklenmiştir.",{
        dismissOthers:true,
        messageType : MessageType.Success,
        position: Position.TopRight
      });
    });
  }
}
