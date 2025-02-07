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
export class ListComponent implements OnInit {
  constructor(private productService : ProductService,private alertifyService : AlertifyService) { }

  displayedColumns: string[] = ['name', 'stock', 'price','createdDate','updatedDate'];
  dataSource : MatTableDataSource<List_Product> = null
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;



async getProducts(){
  const allProducts : List_Product[] = await this.productService.read(this.paginator ? this.paginator.pageIndex :0,this.paginator ? this.paginator.pageSize :5,()=>this.alertifyService.message("Ürün Listelendi",{
    dismissOthers : true,
    messageType : MessageType.Error,
    position : Position.TopRight
  }));
  this.dataSource = new MatTableDataSource<List_Product>(allProducts);
  this.dataSource.paginator = this.paginator;
}

 async ngOnInit() {
   await this.getProducts();
  }

}
