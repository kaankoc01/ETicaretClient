import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { List_Product } from 'src/app/contracts/list.product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DialogService } from 'src/app/services/common/dialog.service';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { QrcodeDialogComponent } from 'src/app/dialogs/qrcode-dialog/qrcode-dialog.component';
declare var $ : any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit ,AfterViewInit{
  constructor(private productService : ProductService,private alertifyService : AlertifyService, private dialogService : DialogService) { }


  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate','photos','qrCode','edit','delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    try {
      const pageIndex = this.paginator?.pageIndex ?? 0;
      const pageSize = this.paginator?.pageSize ?? 5;

      const allProducts: { totalProductCount: number; products: List_Product[] } = await this.productService.read(
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

      this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
      this.paginator.length = allProducts.totalProductCount;
    } catch (error) {
      this.alertifyService.message("Ürünler yüklenirken bir hata oluştu.", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }

  addProductImages(id : string){
    this.dialogService.openDialog({
      componentType : SelectProductImageDialogComponent,
      data : id,
      options :{
        width : "1400px"
      }
    })
  }

  async pageChanged() {
    await this.getProducts();
  }

  ngOnInit() {
    // Verileri burada değil, ngAfterViewInit'te yükle
  }

  ngAfterViewInit() {
    this.getProducts();
  }
  showQRCode(productId : string){
    this.dialogService.openDialog({
      componentType : QrcodeDialogComponent,
      data : productId,
      afterClosed : () => {},
    })
  }

}
