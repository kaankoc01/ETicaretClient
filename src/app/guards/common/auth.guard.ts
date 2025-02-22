import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { _isAuthenticated, AuthService } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

export const authGuard: CanActivateFn = (route, state) => {

 // const authService : AuthService = inject(AuthService);
  const router : Router = inject(Router);
  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const toastrService : CustomToastrService = inject(CustomToastrService);

//  const token : string = localStorage.getItem("accessToken");
 // const decodeToken = jwtHelper.decodeToken(token);
 // const expirationDate : Date = jwtHelper.getTokenExpirationDate(token);
 // let  expired : boolean ;
 // try {
 //   expired = jwtHelper.isTokenExpired(token);
 // } catch  {
 //   expired = true;
 // }
  if(!_isAuthenticated)
  {
    router.navigate(["login"],{ queryParams : {returnUrl : state.url} });
    toastrService.message("oturum açmanız gerekiyor","Yetkisiz Erişim",{
      messageType : ToastrMessageType.Warning,
      position : ToastrPosition.TopRight
    })
  }
  return true;
}
