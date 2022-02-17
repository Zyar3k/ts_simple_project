import BasketProduct from '../ProductTypes/BasketProduct';
import Storage from '../Storage/Storage';
import './Basket.module.scss';

class Basket {
  private static readonly BASKET_CLASS = 'basket';
  private static readonly PRODUCTS_LIST_CLASS = 'basket__products-list';
  private static readonly PRODUCTS_LIST_ITEM_CLASS = 'basket__list-item';
  private static readonly BASKET_POPUP_CLASS = 'basket__popup';
  private static readonly OPEN_POPUP_CLASS = 'basket--is-popup-active';
  private basketProductList!: HTMLUListElement;

  private readonly rootElement: HTMLDivElement;
  private readonly products: BasketProduct[] = [];
  private readonly storage: Storage<BasketProduct>;

  public constructor(containerId: string, storage: Storage<BasketProduct>) {
    const basketElement = document.getElementById(containerId);

    if (basketElement) {
      this.rootElement = basketElement as HTMLDivElement;
      this.attachBasketToDOM();
      this.storage = storage;
      this.products = storage.getItems();
      return;
    }

    throw new Error('Basket element not found');
  }

  public addToBasket(product: BasketProduct): void {
    if (this.isProductAlreadyInBasket(product.id)) {
      this.changeProductQuantity(product.id, product.quantity);
    } else {
      this.products.push(product);
      this.refreshBasketData();
    }

    this.storage.saveItems(this.products);
  }

  public increaseQuantity(productId: string): void {
    this.changeProductQuantity(productId, 1);
    this.storage.saveItems(this.products);
  }
  public decreaseQuantity(productId: string): void {
    this.changeProductQuantity(productId, -1);
    this.storage.saveItems(this.products);
  }

  private isProductAlreadyInBasket(productId: string): boolean {
    return this.products.some(product => product.id === productId);
  }

  private changeProductQuantity(productId: string, newQuantity: number): void {
    let indexProductToRemove: number | null = null;

    this.products.forEach((product, index) => {
      if (product.id !== productId) {
        return;
      }

      product.quantity += newQuantity;
      if (product.quantity === 0) {
        indexProductToRemove = index;
      }
    });

    // eslint-disable-next-line typescript-eslint/no-unnecessary-condition
    if (indexProductToRemove !== null) {
      this.products.splice(indexProductToRemove, 1);
    }

    this.refreshBasketData();
  }

  private attachBasketToDOM(): void {
    this.rootElement.classList.add(Basket.BASKET_CLASS);
    this.appendBasketButton();
    this.appendBasketPopup();
  }

  private appendBasketButton(): void {
    const basketButton = document.createElement('button');
    const basketIcon = document.createElement('span');

    basketIcon.textContent = 'BASKET';
    basketButton.addEventListener('click', () => {
      if (!this.rootElement.classList.contains(Basket.OPEN_POPUP_CLASS)) {
        this.refreshBasketData();
      }
      this.rootElement.classList.toggle(Basket.OPEN_POPUP_CLASS);
    });
    basketButton.appendChild(basketIcon);
    this.rootElement.appendChild(basketButton);
  }

  private refreshBasketData(): void {
    while (this.basketProductList.firstChild) {
      this.basketProductList.firstChild.remove();
    }

    this.products.forEach(this.createListElement);
  }

  private readonly createListElement = (product: BasketProduct): void => {
    const listElement = document.createElement('li');
    const productInfoElement = document.createElement('p');
    const increaseButton = document.createElement('button');
    const decreaseButton = document.createElement('button');

    productInfoElement.textContent = `${product.name} - ${product.price}: ${product.quantity}`;
    increaseButton.textContent = '+';
    decreaseButton.textContent = '-';

    listElement.classList.add(Basket.PRODUCTS_LIST_ITEM_CLASS);
    increaseButton.addEventListener('click', () => this.increaseQuantity(product.id));
    decreaseButton.addEventListener('click', () => this.decreaseQuantity(product.id));

    listElement.appendChild(productInfoElement);
    listElement.appendChild(increaseButton);
    listElement.appendChild(decreaseButton);
    this.basketProductList.appendChild(listElement);
  };

  private appendBasketPopup(): void {
    const popupContainer = document.createElement('div');
    const productsList = document.createElement('ul');

    popupContainer.classList.add(Basket.BASKET_POPUP_CLASS);
    productsList.classList.add(Basket.PRODUCTS_LIST_CLASS);

    this.basketProductList = productsList;
    popupContainer.appendChild(productsList);
    this.rootElement.appendChild(popupContainer);
  }
}

export default Basket;
