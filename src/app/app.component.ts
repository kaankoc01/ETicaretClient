import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toasterService : CustomToastrService) {
    toasterService.message("Merhaba", "Kaan", {
      messageType : ToastrMessageType.Info,
      position: ToastrPosition.TopCenter
    });
    toasterService.message("Merhaba", "Kaan",  {
      messageType : ToastrMessageType.Warning,
      position: ToastrPosition.TopLeft
    });
    toasterService.message("Merhaba", "Kaan",  {
      messageType : ToastrMessageType.Error,
      position: ToastrPosition.BottomLeft
    });
    toasterService.message("Merhaba", "Kaan",  {
      messageType : ToastrMessageType.Success,
      position: ToastrPosition.BottomFullWidth
    });
  }
}

