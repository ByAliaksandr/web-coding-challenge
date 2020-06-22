import { FormGroup } from '@angular/forms';

/**
 * @description
 * Validator that requires the control's value not to be equal to matchingControl's value.
 * if controls' values are equal than the error `shouldNotMatchmatchingControlName` is set to the control.
 */
export function shouldNotMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    const errorKey = 'shouldNotMatch' + matchingControlName;

    const errors = control.errors || {};

    if (control.value === matchingControl.value) {
      errors[errorKey] = true;
      control.setErrors(errors);
    } else {
      delete errors[errorKey];

      if (Object.keys(errors).length === 0) {
        control.setErrors(null);
      }
    }
  };
}
