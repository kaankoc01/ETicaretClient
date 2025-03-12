import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/common/models/order.service';
import { SingleOrder } from 'src/app/contracts/order/single_order';
import { DialogService } from 'src/app/services/common/dialog.service';
import { CompleteOrderDialogComponent, CompleteOrderState } from '../complete-order-dialog/complete-order-dialog.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss'
})
export class OrderDetailDialogComponent  extends BaseDialog<OrderDetailDialogComponent> implements OnInit{
  constructor(
      dialogRef : MatDialogRef<OrderDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data : OrderDetailDialogState | string, private orderService : OrderService, private dialogService : DialogService, private toastrService : CustomToastrService){
      super(dialogRef)
    }

    singleOrder : SingleOrder

    displayedColumns: string[] = ['name', 'price' ,'quantity' , 'totalPrice'];
    dataSource = [];
    clickedRows = new Set<any>();
    totalPrice : number;

  async ngOnInit() : Promise<void>{
    this.singleOrder =  await this.orderService.getOrderById(this.data as string);
    this.dataSource = this.singleOrder.basketItems;
    this.totalPrice = this.singleOrder.basketItems
    .map((basketItem) => basketItem.price * basketItem.quantity)
    .reduce((price,current) => price + current);
  }

  completeOrder(){
    this.dialogService.openDialog({
      componentType : CompleteOrderDialogComponent,
      data : CompleteOrderState.Yes,
      afterClosed : async () => {
       await this.orderService.completeOrder(this.data as string);
       this.toastrService.message("Sipariş Başarıyla Tamamlanmıştır.! Müşteriye bilgi verilmiştir","Sipariş Tamamlandı.",{
        messageType : ToastrMessageType.Success,
        position : ToastrPosition.TopRight
       });
      }
    })
  }
}


export enum OrderDetailDialogState{
 Close,
 OrderComplete
}
