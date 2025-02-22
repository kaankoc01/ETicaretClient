import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    RouterModule,
    JwtModule.forRoot({
      config : {
        tokenGetter : () => localStorage.getItem("accessToken"),
        allowedDomains : ["localhost:7159"]
      }
    })
  ],
  providers: [
    {provide : "baseUrl", useValue:"https://localhost:7159/api",multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
