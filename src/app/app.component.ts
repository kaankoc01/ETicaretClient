import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public authService : AuthService, private toastrService : CustomToastrService, private router : Router, private httpclientService : HttpClientService) {

    httpclientService.put({
      controller : "baskets"
    },{
      basketItemId: "46238a97-b12e-4952-ae35-92f64fc465c9",
      quantity: 125
    }).subscribe(data => {
      debugger;
    });


    authService.identityCheck();
  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("oturum Kapatılmıştır.","Oturum Kapatıldı",{
      messageType : ToastrMessageType.Warning,
      position : ToastrPosition.TopRight,
    })
  }
}


