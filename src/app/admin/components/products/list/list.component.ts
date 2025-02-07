import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { List_Product } from 'src/app/contracts/list.product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit ,AfterViewInit{
  constructor(private productService : ProductService,private alertifyService : AlertifyService) { }


  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];
  dataSource: MatTableDataSource<List_Product> = new MatTableDataSource<List_Product>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    try {
      const pageIndex = this.paginator?.pageIndex ?? 0;
      const pageSize = this.paginator?.pageSize ?? 5;

      const allProducts: { totalCount: number; products: List_Product[] } = await this.productService.read(
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
      this.dataSource.paginator = this.paginator;
      this.paginator.length = allProducts.totalCount;
    } catch (error) {
      this.alertifyService.message("Ürünler yüklenirken bir hata oluştu.", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
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

}
