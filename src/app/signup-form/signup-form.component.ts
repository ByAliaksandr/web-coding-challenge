import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { shouldNotMatch } from '../validators/shoud-not-match.validator';
import { SignupService } from './service/signup.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RouterParts } from '../app-routing-path.enum';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;

  hiddenPassword = true;
  submitError = false;

  private unsubscribe$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private router: Router, private signupService: SignupService) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group(
      {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z]).{8,}')]),
      },
      {
        validator: [shouldNotMatch('password', 'firstname'), shouldNotMatch('password', 'lastname')],
      }
    );
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit(): void {
    this.submitError = false;

    if (this.signupForm.valid) {
      this.signupService
        .signup({
          firstName: this.signupForm.controls['firstname'].value,
          lastName: this.signupForm.controls['lastname'].value,
          email: this.signupForm.controls['email'].value,
          password: this.signupForm.controls['password'].value,
        })
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.resetForm();
            this.router.navigate([RouterParts.Home]);
          },
          error => {
            this.submitError = true;
          }
        );
    }
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.signupForm.controls['password'];
    if (passwordControl.hasError('required')) {
      return 'Password is required';
    } else if (passwordControl.hasError('pattern')) {
      return 'Password should be a minimum of eight characters and contain lower & uppercase letters';
    } else if (passwordControl.hasError('shouldNotMatchfirstname')) {
      return 'Password should not match first name';
    } else if (passwordControl.hasError('shouldNotMatchlastname')) {
      return 'Password should not match last name';
    }

    return '';
  }

  private resetForm(): void {
    this.signupForm.reset({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
  }
}
