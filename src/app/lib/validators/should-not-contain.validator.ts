import { FormGroup } from '@angular/forms';

/**
 * @description
 * Validator that requires the control's value not to contain anotherControl's value.
 * if control's value contains anotherControl's value than the error `shouldNotContainanotherControlName` is set to the control.
 */
export function shouldNotContain(controlName: string, anotherControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const anotherControl = formGroup.controls[anotherControlName];

    const errorKey = 'shouldNotContain' + anotherControlName;

    const errors = control.errors || {};

    if (control.value && control.value.includes(anotherControl.value)) {
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
