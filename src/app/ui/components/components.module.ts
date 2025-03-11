import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { UpdatePasswordModule } from './update-password/update-password.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
 //   LoginModule,
    PasswordResetModule,
    UpdatePasswordModule
  ],
  exports:[
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    UpdatePasswordModule,
    PasswordResetModule
  ]
})
export class ComponentsModule { }
