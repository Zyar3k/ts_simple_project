import Router from '../Router/Router';
import ProductPage from '../ProductPage/ProductPage';
import BackendBook from '../ProductTypes/BackendBook';
import Basket from '../Basket/Basket';

class BackendBooksPage extends ProductPage<BackendBook> {
  protected readonly products: BackendBook[] = [
    { backendLanguage: 'Python', id: 'be-001', name: 'Backend Book 1', price: 15 },
    { backendLanguage: 'Ruby', id: 'be-002', name: 'Backend Book 2', price: 25 },
    { backendLanguage: 'Python', id: 'be-003', name: 'Backend Book 3', price: 35 },
  ];

  public constructor(containerId: string, listingName: string, router: Router, basket: Basket) {
    super(containerId, listingName, router, basket);
  }

  protected productTemplate = ({ backendLanguage, id, name, price }: BackendBook): HTMLElement => {
    const element = document.createElement('article');
    const titleElement = document.createElement('p');
    const priceElement = document.createElement('p');
    const languageElement = document.createElement('p');
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
    languageElement.textContent = backendLanguage;
    formElement.addEventListener('submit', () => {
      const input = formElement.querySelector(`#product-${id}`) as HTMLInputElement;
      const quantity = Number(input.value);
      this.basket.addToBasket({ id, name, price, quantity });
      input.value = '0';
    });

    element.appendChild(titleElement);
    element.appendChild(priceElement);
    element.appendChild(formElement);
    element.appendChild(languageElement);
    return element;
  };
}

export default BackendBooksPage;
