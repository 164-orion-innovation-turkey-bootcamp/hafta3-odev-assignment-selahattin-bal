import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './signup/signup.component';
// routes for components
const routes: Routes = [
  {path:"login",component:LoginComponent},  
  {path:"signup",component:SignupComponent},
  //AuthGuard is blocking route if login did not happen 
  {path:"homepage",component:HomepageComponent,canActivate: [AuthGuard]},
  {path:"",redirectTo:"login",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
