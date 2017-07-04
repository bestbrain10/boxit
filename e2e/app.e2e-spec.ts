import { BoxitMainPage } from './app.po';

describe('boxit-main App', () => {
  let page: BoxitMainPage;

  beforeEach(() => {
    page = new BoxitMainPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
