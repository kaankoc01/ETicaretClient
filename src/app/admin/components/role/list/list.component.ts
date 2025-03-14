import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Role } from 'src/app/contracts/role/List_Role';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit , AfterViewInit{
   constructor(private roleService : RoleService,private alertifyService : AlertifyService, private dialogService : DialogService) { }


    displayedColumns: string[] = ['name','edit','delete'];
    dataSource: MatTableDataSource<List_Role> = null;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    async getRoles() {
      try {
        const pageIndex = this.paginator?.pageIndex ?? 0;
        const pageSize = this.paginator?.pageSize ?? 5;

        const allRoles : { datas : List_Role[], totalCount :number } = await this.roleService.getRoles(
          pageIndex,
          pageSize,
          () => this.alertifyService.message("Roller Listelendi", {
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


        this.dataSource = new MatTableDataSource<List_Role>(allRoles.datas);
        this.paginator.length = allRoles.totalCount;
      } catch (error) {
        this.alertifyService.message("Roller yüklenirken bir hata oluştu.", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    }



    async pageChanged() {
      await this.getRoles();
    }

    ngOnInit() {
      // Verileri burada değil, ngAfterViewInit'te yükle
    }

    ngAfterViewInit() {
      this.getRoles();
    }

}
