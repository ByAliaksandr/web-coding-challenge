import { SignupFormComponent } from './signup-form.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../service/signup.service';
import { of } from 'rxjs/internal/observable/of';
import { RouterParts } from 'src/app/app-routing-path.enum';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('SignupFormComponent', () => {
  let signupFormComponent: SignupFormComponent;
  let formBuilterSpy: jasmine.SpyObj<FormBuilder>;
  let routerSpy: jasmine.SpyObj<Router>;
  let signupServiceSpy: jasmine.SpyObj<SignupService>;

  beforeEach(() => {
    formBuilterSpy = jasmine.createSpyObj('formBuilder', ['group']);
    routerSpy = jasmine.createSpyObj('router', ['navigate']);
    signupServiceSpy = jasmine.createSpyObj('signupService', ['signup']);
    signupFormComponent = new SignupFormComponent(formBuilterSpy, routerSpy, signupServiceSpy);
  });

  it('should create', () => {
    expect(signupFormComponent).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should create the signupForm', () => {
      signupFormComponent.ngOnInit();

      expect(formBuilterSpy.group).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    beforeEach(() => {
      signupFormComponent.signupForm = new FormGroup({
        firstname: new FormControl(''),
        lastname: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
      });

      signupServiceSpy.signup.and.returnValue(of({}));
    });

    it('should clean up the submit error', () => {
      signupFormComponent.submit();

      expect(signupFormComponent.submitError).toBeFalsy();
    });

    it('should signup', () => {
      signupFormComponent.submit();

      expect(signupServiceSpy.signup).toHaveBeenCalled();
    });

    it('should navigate to the home page', () => {
      signupFormComponent.submit();

      expect(routerSpy.navigate).toHaveBeenCalledWith([RouterParts.Home]);
    });

    it('should show the submit error', () => {
      signupServiceSpy.signup.and.returnValue(throwError('error'));

      signupFormComponent.submit();

      expect(signupFormComponent.submitError).toBeTruthy();
    });
  });
});
