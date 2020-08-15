import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PaymentPageComponent} from './payment-page/payment-page.component';
import {HomePageComponent} from "./home/home-page.component";

const routes: Routes = [
  {path: 'payment', component: PaymentPageComponent},
  {path: 'home', component: HomePageComponent},
  {path: '**', redirectTo: 'home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

