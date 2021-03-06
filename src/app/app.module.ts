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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { RoomItemComponent } from './room-test/room-item/room-item.component';
import {MatDialogModule} from '@angular/material/dialog';
import { OwnerSelectorComponent } from './room-test/owner-selector/owner-selector.component';
import { AnketaComponent } from './anketa/anketa.component';
import { CheckIconComponent } from './check-icon/check-icon.component';
import { TestResultDialogComponent } from './test-result-dialog/test-result-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { ByMemberComponent } from './statistic/by-member/by-member.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    LoginComponent,
    RoomTestComponent,
    QuestionRowComponent,
    SppChildrenComponent,
    TestRouterComponent,
    SppAdultComponent,
    RoomItemComponent,
    OwnerSelectorComponent,
    AnketaComponent,
    CheckIconComponent,
    TestResultDialogComponent,
    InfoDialogComponent,
    ByMemberComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OwnerSelectorComponent],
})
export class AppModule { }
