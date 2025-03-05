import { Component, OnInit } from '@angular/core';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Update_Basket_Items } from 'src/app/contracts/basket/update_basket_item';
import { BasketService } from 'src/app/services/common/models/basket.service';

declare var $ :any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent implements OnInit {

  constructor(private basketService : BasketService) { }

  basketItems : List_Basket_Item[];
  async ngOnInit(): Promise<void> {
   this.basketItems = await this.basketService.get()
  }
  async changeQuantity(object : any){
    const basketItemId : string = object.target.attributes["id"].value;
    const quantity : number = object.target.value;
    const basketItem : Update_Basket_Items = new Update_Basket_Items();
    basketItem.basketItemId = basketItemId;
    basketItem.quantity = quantity;
    await this.basketService.updateQuantity(basketItem)
  }
  async removeBasketItem(basketItemId: string){

    await this.basketService.remove(basketItemId);
    $("." + basketItemId).fadeOut(500);

  }

}
