import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { shouldNotContain } from 'src/app/lib/validators/should-not-contain.validator';
import { SingupRequest } from '../service/signup-request.interface';
import { RouterParts } from 'src/app/app-routing-path.enum';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit, OnDestroy {
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
        validator: [shouldNotContain('password', 'firstname'), shouldNotContain('password', 'lastname')],
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  submit(): void {
    this.submitError = false;

    if (this.signupForm.valid) {
      this.signupService
        .signup(this.getSignupData())
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
    } else if (passwordControl.hasError('shouldNotContainfirstname')) {
      return 'Password should not contain first name';
    } else if (passwordControl.hasError('shouldNotContainlastname')) {
      return 'Password should not contain last name';
    }

    return '';
  }

  private getSignupData(): SingupRequest {
    return {
      firstName: this.signupForm.controls['firstname'].value,
      lastName: this.signupForm.controls['lastname'].value,
      email: this.signupForm.controls['email'].value,
      password: this.signupForm.controls['password'].value,
    };
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
