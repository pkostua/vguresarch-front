import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstPageComponent } from './first-page/first-page.component';
import {LoginComponent} from './login/login.component';
import {RoomTestComponent} from './room-test/room-test.component';
import {SppChildrenComponent} from './spp-children/spp-children.component';
import {TestRouterComponent} from './test-router/test-router.component';
import {SppAdultComponent} from './spp-adult/spp-adult.component';

const routes: Routes = [
  {path: 'first', component: FirstPageComponent },
  {path: 'login', component: LoginComponent },
  {path: 'room-test', component: RoomTestComponent },
  {path: 'sppChildren', component: SppChildrenComponent },
  {path: 'sppAdult', component: SppAdultComponent },
  {path: 'testRouter', component: TestRouterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
