import BackendBooksPage from './BackendBooksPage/BackendBooksPage';
import Basket from './Basket/Basket';
import BasketStorage from './BasketStorage/BasketStorage';
import FrontendBooksPage from './FrontendBooksPage/FrontendBooksPage';
import './global-styles.scss';
import Router from './Router/Router';

const redirectFunction = (location: string): void => {
  window.location.hash = `#/${location}`;
};

const frontendButton = document.getElementById('fe-button');

if (frontendButton) {
  frontendButton.addEventListener('click', () => redirectFunction('frontend'));
}

const backendButton = document.getElementById('be-button');

if (backendButton) {
  backendButton.addEventListener('click', () => redirectFunction('backend'));
}

const storage = new BasketStorage();
const router = new Router();
const basket = new Basket('basket', storage);

new FrontendBooksPage('listing-page', 'frontend', router, basket);
new BackendBooksPage('listing-page', 'backend', router, basket);

export {};
