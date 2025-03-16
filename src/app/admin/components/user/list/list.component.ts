import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { OrderService } from 'src/app/services/common/models/order.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

  constructor(private orderService : OrderService, private alertifyService : AlertifyService, private dialogService : DialogService) {}
  ngOnInit(): void {

  }

    displayedColumns: string[] = ['orderCode' , 'userName', 'totalPrice', 'createdDate','completed','viewdetail', 'delete'];
    dataSource: MatTableDataSource<List_Order> = null;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    async getOrders() {
      try {
        const pageIndex = this.paginator?.pageIndex ?? 0;
        const pageSize = this.paginator?.pageSize ?? 5;

        const allOrders: { totalOrderCount: number; orders: List_Order[] } = await this.orderService.getAllOrders(
          pageIndex,
          pageSize,
          () => this.alertifyService.message("Ürün Listelendi", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          }),
          (errorMessage) => this.alertifyService.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          })
        );

        this.dataSource = new MatTableDataSource<List_Order>(allOrders.orders);
        this.paginator.length = allOrders.totalOrderCount;
      } catch (error) {
        this.alertifyService.message("Ürünler yüklenirken bir hata oluştu.", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    }

    async pageChanged() {
      await this.getOrders();
    }

     ngAfterViewInit() {
       this.getOrders();
    }

    showDetail(id : string){
      this.dialogService.openDialog({
        componentType : OrderDetailDialogComponent,
        data : id,
        options : {
          width : "750px"
        }
      })
    }

}
