import 'regenerator-runtime';
import '../styles/responsive.css';
import '../styles/loader.css';
import '../styles/style.css';
import App from './views/app';

const app = new App({
  header: document.querySelector('#header'),
  aside: document.querySelector('#aside'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  window.history.forward();
  app.renderPage();
});

window.addEventListener('load', () => {
  window.history.forward();
  app.renderPage();
});

function preventBack() {
  window.history.forward();
}

setTimeout(preventBack(), 0);

window.onunload = function () { null; };
