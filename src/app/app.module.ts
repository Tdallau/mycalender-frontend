import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomHttpInterceptor } from './_helpers/custom.http.interceptor';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { CalendarCategoryCardComponent } from './_common/calendar-category-card/calendar-category-card.component';
import { LoginComponent } from './_modals/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendersComponent } from './calenders/calenders.component';
import { CalenderComponent } from './_common/calender/calender.component';
import { CalenderDayComponent } from './_common/calender-day/calender-day.component';
import { EventEditModalComponent } from './_modals/event-edit-modal/event-edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MyAccountComponent,
    CalendarCategoryCardComponent,
    LoginComponent,
    CalendersComponent,
    CalenderComponent,
    CalenderDayComponent,
    EventEditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
