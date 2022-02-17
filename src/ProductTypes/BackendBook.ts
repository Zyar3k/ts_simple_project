import Product from './Product';

type BackendLanguage = 'JS' | 'TS' | 'Python' | 'Ruby';

type BackendBook = {
  backendLanguage: BackendLanguage;
} & Product;

export default BackendBook;
