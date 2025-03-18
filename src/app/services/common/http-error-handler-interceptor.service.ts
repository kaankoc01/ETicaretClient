import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from '../admin/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor{

  constructor(private toastrService : CustomToastrService,private userAuthService : UserAuthService, private router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch(error.status){
        case HttpStatusCode.Unauthorized :
        this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"),(state) => {
          if(!state){
            const url = this.router.url
        if(url =="/products")
            this.toastrService.message("Sepete ürün eklemek için oturum açmanız gerekiyor.","Oturum Açınız",{
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.TopRight
            });
        else
          this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır","Yetkisiz İşlem",{
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          });
          }
        }).then(data => {
          this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır","Yetkisiz İşlem",{
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          });
        });
          break;
        case HttpStatusCode.InternalServerError :
          this.toastrService.message("Sunucuya Erişilmiyor","Sunucu Hatası",{
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest :
          this.toastrService.message("Geçersiz İstek Yapıldı","Geçersiz İstek",{
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound :
          this.toastrService.message("Sayfa Bulunamadı","Sayfa Bulunamadı",{
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir","HATA !",{
            messageType : ToastrMessageType.Warning,
            position : ToastrPosition.BottomFullWidth
          });
          break;
      }
      return of(error);
    }));
  }
}
