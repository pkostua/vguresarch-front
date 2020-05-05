import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FirstPageComponent } from './first-page/first-page.component';
import {AppRoutingModule} from './routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RoomTestComponent } from './room-test/room-test.component';
import { QuestionRowComponent } from './question-row/question-row.component';
import { SppChildrenComponent } from './spp-children/spp-children.component';
import { TestRouterComponent } from './test-router/test-router.component';
import { SppAdultComponent } from './spp-adult/spp-adult.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    LoginComponent,
    RoomTestComponent,
    QuestionRowComponent,
    SppChildrenComponent,
    TestRouterComponent,
    SppAdultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
