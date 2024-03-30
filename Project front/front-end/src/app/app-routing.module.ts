import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { ProbaComponent } from './layout/proba/proba.component';

const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: 'loginN', component: ProbaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
