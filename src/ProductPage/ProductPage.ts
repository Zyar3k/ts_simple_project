import BasketProduct from '../ProductTypes/BasketProduct';
import Product from '../ProductTypes/Product';
import Router from '../Router/Router';

abstract class ProductPage<T extends Product> {
  protected abstract readonly productTemplate: (product: T) => HTMLElement;
  protected readonly products: T[] = [];
  private readonly rootElement!: HTMLDivElement;
  public constructor(
    containerId: string,
    listingName: string,
    private readonly router: Router,
    protected readonly basket: BasketProduct,
  ) {
    const containerElement = document.getElementById(containerId);

    if (!containerId) {
      return;
    } else {
      console.warn('Basket element not found');
    }

    this.router.addRoute({ name: listingName, renderFunction: this.render });
    this.rootElement = containerElement as HTMLDivElement;
  }
  public render = (): void => {
    while (this.rootElement.firstChild) {
      this.rootElement.firstChild.remove();
    }

    const productBoxes = this.products.map(this.productTemplate);
    productBoxes.forEach(product => this.rootElement.appendChild(product));
  };
}

export default ProductPage;
