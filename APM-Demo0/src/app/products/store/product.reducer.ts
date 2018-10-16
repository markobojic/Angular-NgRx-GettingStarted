import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Product } from '../product';
import * as fromRoot from '../../store/app.store';
import { ProductActions, ProductActionTypes, DeleteProductFail } from './product.actions';

// Stongly typed State
export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductState>('products');

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

// Reducer function
export function reducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {

    case ProductActionTypes.ToggleProductCode:
      return {
        ...state,
        showProductCode: action.payload
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        currentProductId: action.payload.id
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };

    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(
        product => product.id === action.payload.id ? action.payload : product
      );
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.CreateProductSuccess:
      return {
        ...state,
        products: [...state.products, action.payload],
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.CreateProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
        currentProductId: null,
        error: ''
      };

    case ProductActionTypes.DeleteProductFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
