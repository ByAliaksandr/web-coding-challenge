# WebCodingChallenge

This project is a single page app with a sign-up form.
The form has 4 fields first name, last name, email and password.

Password validation supports

- a minimum of eight characters
- lower and uppercase letters
- not contain the user’s first or last name

Email validation is a standard angular forms email validator. Please check the link below for more details.
https://angular.io/api/forms/Validators#email

The form sends a POST request to https://demo-api.now.sh/users.

## About the project

_Note_ This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.
It comes with the default configuration to run unit and end-to-end tests.

This project relies on Angular Material and Bootstrap Grid system. Angular Material provides a set of reusable and accessible UI components. Angular Material perfectly fits for projects with forms which require various validation scenarios.

This project employs prettier with a pre-commit tool. This re-formats files that are marked as "staged" via git add before a commit.

The project contains to 2 pages: `signupForm` page and dummy `home` page; 1 `signup` service to sign up; 1 `shouldNotMatch` custom form validator. All components & services are covered by unit tests. The `signupForm` page is covered by e2e tests.

The `signupForm` page improvements:

- The page should be a container for subcomponents. So we can split it into 'header' component and only 'form' component.

Tests improvements:

- `shouldNotMatch` validator unit tests must be extended to cover more scenarios.
- The `signupForm` e2e tests must be extended to at least one successful scenario.

## The project structure

This project has `pages` and `lib` folders. The page embraces and isolates the business logic. Normally a page has various subcomponents. The `lib` folder is a shared folder for common components and services.

## FAQ

- Why angular forms email validator is used?

  It is a well-tested and robust solution which doesn't require extra effort. It saves time.
  Async validation can help us to verify if a user's email is already used. So this can be a potential improvement.

- Why Angular Material is used?

  Angular Material perfectly fits for projects with forms which require various validation scenarios.
  Angular Material UI and animation bring the project to the 'production-ready' state: it stays on brand; it works across the web and mobile; it is optimized for Angular.

- Why TestBed is not used?

  It is just very slow for big production projects. In many cases it is not required to instantiate a wrapping module to test the component's functionality.

- Why cypress is not used?

  I love cypress mainly for the debugging experience. In this project, I stick with default CLI e2e configuration which is protractor.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

To debug e2e tests:

- run `ng serve`
- run `node --inspect-brk node_modules/protractor/bin/protractor e2e/protractor.conf.js`
- open chrome://inspect/#devices

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
