import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { CreateCertificateComponent } from './features/create-certificate/create-certificate.component';
import { CreateCAEEComponent } from './features/create-caee/create-caee.component';
import { CreateByCaComponent } from './features/creatingByCA/create-by-ca/create-by-ca.component';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'createCertificate', component: CreateCertificateComponent },
  { path: 'createCAEE', component: CreateCAEEComponent },
  { path: 'createCAEEbyCA', component: CreateByCaComponent },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
