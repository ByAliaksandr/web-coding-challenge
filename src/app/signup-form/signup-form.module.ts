import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SignupFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class SignupFormModule { }
