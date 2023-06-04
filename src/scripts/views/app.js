/* eslint-disable class-methods-use-this */
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ header, aside, content }) {
    this._header = header;
    this.aside = aside;
    this._content = content;
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url];
      this._content.innerHTML = await page.render();
      await page.afterRender();
    } catch (error) {
      this._content.innerHTML = `<h1>${error}</h1>`;
    }
  }
}

export default App;
