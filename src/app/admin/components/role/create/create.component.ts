import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{

constructor(private roleService :RoleService ,private alertify : AlertifyService) { }

  ngOnInit(): void {
  }


    @Output() createdRole : EventEmitter<string> = new EventEmitter();


    create(name:HTMLInputElement){


      this.roleService.create(name.value, () => {
        this.alertify.message("Role başarıyla eklenmiştir.",{
          dismissOthers:true,
          messageType : MessageType.Success,
          position: Position.TopRight
        });
        this.createdRole.emit(name.value);
      },errorMessage => {
        this.alertify.message(errorMessage,
          {
          dismissOthers:true,
          messageType : MessageType.Error,
          position : Position.TopLeft
        });
      });
    }
}
