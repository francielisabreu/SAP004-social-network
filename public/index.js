// Este é o ponto de entrada de sua aplicação
// import { home, registro } from './pages/home/main.js';
import routes from './pages/home/routes.js';

const main = document.querySelector('.root')

const init = () => {
  window.addEventListener('hashchange', (e) => {
    e.preventDefault();
    renderPage();
  })
};

const renderPage = () =>{
  main.innerHTML = '';
  const page = validateHash(window.location.hash);
  console.log(page)
  main.appendChild(routes[page]);
};

const validateHash = (hash) => hash === '' ? 'home' : hash.replace('#', '')
window.addEventListener('load', () => {
  renderPage();
  init();
});
