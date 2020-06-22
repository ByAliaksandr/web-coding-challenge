import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { RouterParts } from './app-routing-path.enum';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: RouterParts.SignupForm, pathMatch: 'full' },
  { path: RouterParts.SignupForm, component: SignupComponent },
  { path: RouterParts.Home, component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
