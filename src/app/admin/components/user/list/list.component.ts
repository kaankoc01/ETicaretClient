import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_User } from 'src/app/contracts/users/list_user';
import { AuthorizeUserDialogComponent } from 'src/app/dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit{

  constructor(private userService : UserService, private alertifyService : AlertifyService, private dialogService : DialogService) {}
  ngOnInit(): void {

  }

    displayedColumns: string[] = ['userName', 'nameSurname', 'email','twoFactorEnabled','role','delete'];
    dataSource: MatTableDataSource<List_User> = null;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    async getUsers() {
      const allUsers: { totalUsersCount: number; users: List_User[] } = await this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,()=> {}, errorMessage => this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      }))
      this.dataSource = new MatTableDataSource<List_User>(allUsers.users);
      this.paginator.length = allUsers.totalUsersCount;
    }

    async pageChanged() {
      await this.getUsers();
    }

     async ngAfterViewInit() {
      await this.getUsers();
    }
    assignRole(id: string) {
      this.dialogService.openDialog({
        componentType: AuthorizeUserDialogComponent,
        data: id,
        options: {
          width: "750px"
        },
        afterClosed: () => {
          this.alertifyService.message("Roller başarıyla atanmıştır!", {
            messageType: MessageType.Success,
            position: Position.TopRight
          })
        }
      });
    }

    }





