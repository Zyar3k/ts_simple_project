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

  attachBasketToDOM(): void {
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

    // this.products.forEach(this.createListElement)
  }

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
