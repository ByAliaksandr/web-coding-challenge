import { Signup } from './signup.po';
import { browser, logging } from 'protractor';

describe('Signup Form', () => {
  let page: Signup;

  beforeEach(() => {
    page = new Signup();
  });

  it('should display Sign Up message', async () => {
    await page.navigateTo();

    const titleText = await page.gitTitle().getText();

    expect(titleText).toEqual('Sign Up');
  });

  it('should display errors under the signupForm controls', async () => {
    await page.navigateTo();

    await page.getSignUpButton().click();
    const count = await page.getMatErrors().count();

    expect(count).toBe(4);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
