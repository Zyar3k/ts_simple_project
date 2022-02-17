import { Router } from 'react-router-dom';
import ProductPage from '../ProductPage/ProductPage';
import BasketProduct from '../ProductTypes/BasketProduct';
import FrontendBook from '../ProductTypes/FrontendBook';

class FrontendBooksPage extends ProductPage<FrontendBook> {
  protected readonly products: FrontendBook[] = [
    { id: 'fe-001', name: 'Frontend Book 1', price: 15 },
    { id: 'fe-001', name: 'Frontend Book 2', price: 25 },
    { id: 'fe-001', name: 'Frontend Book 3', price: 35 },
  ];

  public constructor(
    containerId: string,
    listingName: string,
    router: Router,
    basket: BasketProduct,
  ) {
    super(containerId, listingName, router, basket);
  }

  protected productTemplate = ({ id, name, price }: FrontendBook): HTMLElement => {
    const element = document.createElement('article');
    const titleElement = document.createElement('p');
    const priceElement = document.createElement('p');
    const formElement = document.createElement('form');

    formElement.innerHTML = `
    <label>
        Quantity:
        <input id="product-${id}" type="number" value="0" required>
    </label>
    `.trim();

    titleElement.textContent = name;
    // eslint-disable-next-line no-magic-numbers
    priceElement.textContent = `${price.toFixed(2)}$`;

    formElement.addEventListener('submit', () => {
      const input = formElement.querySelector(`#product-${id}`) as HTMLInputElement;
      const quantity = Number(input.value);
      this.basket.addToBasket({ id, name, price, quantity });
      input.value = '0';
    });

    element.appendChild(titleElement);
    element.appendChild(priceElement);
    element.appendChild(formElement);
    return element;
  };
}

export default FrontendBooksPage;
