import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';

enum RouterParts {
  SignupForm = 'signup-form'
}

const routes: Routes = [
  { path: '', redirectTo: RouterParts.SignupForm, pathMatch: 'full'},
  { path: RouterParts.SignupForm, component: SignupFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
