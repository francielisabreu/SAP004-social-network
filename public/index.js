// Este é o ponto de entrada de sua aplicação
// import { home, registro } from './pages/home/main.js';
import routes from './pages/home/routes.js';

const main = document.querySelector('.form');

const renderPage = () => {
  main.innerHTML = '';
  const page = validateHash(window.location.hash);
  main.appendChild(routes[page]);
};

const init = () => {
  window.addEventListener('hashchange', () => {
    renderPage();
  });
};

const validateHash = (hash) => (hash === '' ? 'home' : hash.replace('#', ''));
window.addEventListener('load', () => {
  renderPage();
  init();
});
