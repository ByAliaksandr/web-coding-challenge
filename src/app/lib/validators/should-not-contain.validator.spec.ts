import { shouldNotContain } from './should-not-contain.validator';
import { FormGroup, FormControl } from '@angular/forms';

describe('shouldNotContain', () => {
  let formGroup: FormGroup;

  it('should not set an error', () => {
    formGroup = new FormGroup({
      firstname: new FormControl('Aaa'),
      lastname: new FormControl('Bbb'),
    });

    shouldNotContain('firstname', 'lastname')(formGroup);

    expect(formGroup.get('firstname').hasError('shouldNotContainlastname')).toBeFalsy();
  });

  it('should set an error as firstname is equal lastname', () => {
    formGroup = new FormGroup({
      firstname: new FormControl('Aaa'),
      lastname: new FormControl('Aaa'),
    });

    shouldNotContain('firstname', 'lastname')(formGroup);

    expect(formGroup.get('firstname').hasError('shouldNotContainlastname')).toBeTruthy();
  });

  it('should set an error as firstname contains lastname', () => {
    formGroup = new FormGroup({
      firstname: new FormControl('Aaaabbbb'),
      lastname: new FormControl('aabb'),
    });

    shouldNotContain('firstname', 'lastname')(formGroup);

    expect(formGroup.get('firstname').hasError('shouldNotContainlastname')).toBeTruthy();
  });
});
