import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignuComponent } from './pages/signu/signu.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup',component:SignuComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
