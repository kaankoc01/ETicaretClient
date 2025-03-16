import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogModule } from 'src/app/dialogs/dialog.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UserComponent,ListComponent
  ],
  imports: [
    CommonModule,MatSidenavModule , MatFormFieldModule, MatInputModule , MatButtonModule , MatTableModule , MatPaginatorModule , MatDialogModule  , DialogModule , DeleteDirectiveModule,
     RouterModule.forChild([
            {path:"",component: UserComponent}
        ]),
  ]
})
export class UserModule { }
