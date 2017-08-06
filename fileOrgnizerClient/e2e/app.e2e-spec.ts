import { FileOrgnizerPage } from './app.po';

describe('file-orgnizer App', () => {
  let page: FileOrgnizerPage;

  beforeEach(() => {
    page = new FileOrgnizerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
