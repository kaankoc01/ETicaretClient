import { Component, OnInit } from '@angular/core';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private alertify : AlertifyService ,private signalRService : SignalRService) {
   }

  ngOnInit(): void {
    this.signalRService.on(HubUrls.ProductHub, ReceiveFunctions.ProductAddedMessageReceiveFunction,message => {
      this.alertify.message(message , {
        messageType : MessageType.Notify,
        position : Position.TopRight
      })
    });
    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction,message => {
      this.alertify.message(message , {
        messageType : MessageType.Notify,
        position : Position.TopCenter
      })
    });
  }
  m(){
    this.alertify.message("Merhaba", {
      messageType : MessageType.Success,
      delay : 5,
      position : Position.TopRight
    })
  }
  d(){
    this.alertify.dismiss();
  }
}
