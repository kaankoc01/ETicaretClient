import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BasketsComponent } from './baskets.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
          {path:"",component: BasketsComponent}
        ])
  ]
})
export class BasketsModule { }
