import { PrecisionSlidersPage } from './app.po';

describe('angular-precision-sliders App', () => {
  let page: PrecisionSlidersPage;

  beforeEach(() => {
    page = new PrecisionSlidersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
