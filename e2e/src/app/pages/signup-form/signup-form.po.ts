import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class SignupForm {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  gitTitle(): ElementFinder {
    return element(by.css('app-root .title'));
  }

  getSignUpButton(): ElementFinder {
    return element(by.css('app-root form button.full-width-field'));
  }

  getMatErrors(): ElementArrayFinder {
    return element.all(by.css('app-root form .form-group mat-error'));
  }
}
