import { SignupService } from './signup.service';
import { HttpClient } from '@angular/common/http';
import { SingupRequest } from './signup-request.interface';

describe('SignupService', () => {
  let signupService: SignupService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('http', ['post']);
    signupService = new SignupService(httpSpy);
  });

  it('should be created', () => {
    expect(signupService).toBeTruthy();
  });

  describe('signup', () => {
    it('should be make a demo call', () => {
      const signupData: SingupRequest = {
        firstName: 'Aaa',
        lastName: 'Bbb',
        email: 'aa.bb@gmail.com',
        password: 'Password',
      };

      signupService.signup(signupData);

      expect(httpSpy.post).toHaveBeenCalledWith('https://demo-api.now.sh/users', signupData);
    });
  });
});
