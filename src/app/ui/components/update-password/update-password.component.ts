import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss'
})
export class UpdatePasswordComponent implements OnInit {
constructor(private userAuthService : UserAuthService, private activatedRoute : ActivatedRoute,private alertifyService : AlertifyService, private userService : UserService,private router: Router){
}
state: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next : async params => {
        const userId : string = params["userId"];
        const resetToken : string = params["resetToken"];
        this.state = await this.userAuthService.verifyResetToken(resetToken,userId, () => {
        })
      }
    });
  }

  updatePassword(password: string, passwordConfirm: string) {
    if (password != passwordConfirm) {
      this.alertifyService.message("Şifreleri doğrulayınız!", {
        messageType: MessageType.Error,
        position: Position.TopRight
      });
      return;
    }
    this.activatedRoute.params.subscribe({
      next: async params => {
        const userId: string = params["userId"];
        const resetToken: string = params["resetToken"];
        await this.userService.updatePassword(userId, resetToken, password, passwordConfirm,
          () => {
            this.alertifyService.message("Şifre başarıyla güncellenmiştir.", {
              messageType: MessageType.Success,
              position: Position.TopRight
            })
            this.router.navigate(["/login"])
          },
          error => {
            console.log(error)
          });
      }
    })

}


}
