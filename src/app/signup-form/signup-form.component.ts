import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { shouldNotMatch } from '../validators/shoud-not-match.validator';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;

  hiddenPassword = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*[a-z]).{8,}')]),
    },
    {
      validator: [shouldNotMatch('password', 'firstname'), shouldNotMatch('password', 'lastname')],
    });
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

}
