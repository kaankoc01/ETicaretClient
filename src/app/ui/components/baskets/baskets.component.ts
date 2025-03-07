import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List_Basket_Item } from 'src/app/contracts/basket/list-basket-item';
import { Update_Basket_Items } from 'src/app/contracts/basket/update_basket_item';
import { Create_Order } from 'src/app/contracts/order/create_order';
import { BasketItemDeleteState, BasketItemRemoveDialogComponent } from 'src/app/dialogs/basket-item-remove-dialog/basket-item-remove-dialog.component';
import { ShoppingCompleteDialogComponent, ShoppingCompleteState } from 'src/app/dialogs/shopping-complete-dialog/shopping-complete-dialog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { OrderService } from 'src/app/services/common/models/order.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

declare var $ :any;

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent implements OnInit {

  constructor(private basketService : BasketService, private orderService : OrderService, private customToastrService : CustomToastrService , private router : Router,private dialogService : DialogService) { }

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
   removeBasketItem(basketItemId: string){
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType : BasketItemRemoveDialogComponent,
      data : BasketItemDeleteState.Yes,
      afterClosed : async () => {
        await this.basketService.remove(basketItemId);
        $("." + basketItemId).fadeOut(500);
        $("#basketModal").modal("show");
      }
    });


  }

  shoppingComplete(){
    $("#basketModal").modal("hide");
    this.dialogService.openDialog({
      componentType : ShoppingCompleteDialogComponent,
      data : ShoppingCompleteState.Yes,
      afterClosed :async () => {
        const order : Create_Order = new Create_Order();
        order.address = "Yenimahalle";
        order.description = "falan filan";
        await this.orderService.create(order);
        this.customToastrService.message("Sipariş alınmıştır!", "Sipariş oluşturuldu",{
          messageType : ToastrMessageType.Info,
          position : ToastrPosition.TopRight
        })
        this.router.navigate(["/"]);
      }
    })

  }

}
