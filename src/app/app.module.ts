import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';

//routing
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';

//interceptors
import { StandardInterceptor } from './interceptors/interceptor';

//services
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,

    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StandardInterceptor,
      multi: true
    },

    //services
    AuthService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
