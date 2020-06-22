import { shouldNotMatch } from './should-not-match.validator';
import { FormGroup, FormControl } from '@angular/forms';

describe('shouldNotMatch', () => {
  let formGroup: FormGroup;

  it('should set an error', () => {
    formGroup = new FormGroup({
      firstname: new FormControl('Aaa'),
      lastname: new FormControl('Aaa'),
    });

    shouldNotMatch('firstname', 'lastname')(formGroup);

    expect(formGroup.get('firstname').hasError('shouldNotMatchlastname')).toBeTruthy();
  });

  it('should not set an error', () => {
    formGroup = new FormGroup({
      firstname: new FormControl('Aaa'),
      lastname: new FormControl('Bbb'),
    });

    shouldNotMatch('firstname', 'lastname')(formGroup);

    expect(formGroup.get('firstname').hasError('shouldNotMatchlastname')).toBeFalsy();
  });
});
