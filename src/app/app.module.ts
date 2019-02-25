import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { StopPageComponent } from './stop-page/stop-page.component';
import {HttpErrorInterceptor} from '../services/http-error.interceptor';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatInput, MatInputModule, MatSelectModule, MatTextareaAutosize} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    StopPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
