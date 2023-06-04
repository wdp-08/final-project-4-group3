import 'regenerator-runtime';
import '../styles/style.css';
import App from './views/app';

const app = new App({
  header: document.querySelector('#header'),
  aside: document.querySelector('#aside'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});

console.log('Hello Coders!');
