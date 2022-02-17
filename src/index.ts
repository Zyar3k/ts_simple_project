import Basket from './Basket/Basket';
import BasketStorage from './BasketStorage/BasketStorage';
import './global-styles.scss';
// import Router from './Router/Router';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    basket: BasketStorage;
  }
}

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
// const router = new Router();
const basket = new Basket('basket', storage);

basket.addToBasket({ id: '1', name: 'Product', price: 15, quantity: 5 });

window.basket = storage;

export {};
