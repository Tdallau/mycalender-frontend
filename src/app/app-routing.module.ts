import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AuthGuard } from './_guards/auth.guard';
import { CalendersComponent } from './calenders/calenders.component';
import { CalenderEditScreenComponent } from './calender-edit-screen/calender-edit-screen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calenders', component: CalendersComponent },
  { path: 'account', component: MyAccountComponent, canActivate: [AuthGuard] },
  { path: 'calender/:id', component: CalenderEditScreenComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
