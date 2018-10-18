import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../store/app.store';
import * as fromProducts from './product.reducer';

// Stongly typed State
export interface State extends fromRoot.State {
  products: fromProducts.ProductState;
}

// Selector functions
const getProductFeatureState = createFeatureSelector<fromProducts.ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currenctProductId) => {
    if (currenctProductId === 0) {
      return  {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currenctProductId ? state.products.find(product => product.id === currenctProductId) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
