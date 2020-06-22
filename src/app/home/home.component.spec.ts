import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let homeComponent: HomeComponent;

  beforeEach(() => {
    homeComponent = new HomeComponent();
  });

  it('should create', () => {
    expect(homeComponent).toBeTruthy();
  });
});
