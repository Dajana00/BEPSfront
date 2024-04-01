import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ProbaComponent } from './layout/proba/proba.component';
import { HomeComponent } from './features/home/home.component';
import { CreateCertificateComponent } from './features/create-certificate/create-certificate.component';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'loginN', component: ProbaComponent },
  { path: 'createCertificate', component: CreateCertificateComponent },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
