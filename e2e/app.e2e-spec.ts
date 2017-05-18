import { TodoLiveQueryWebPage } from './app.po';

describe('todo-live-query-web App', () => {
  let page: TodoLiveQueryWebPage;

  beforeEach(() => {
    page = new TodoLiveQueryWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
