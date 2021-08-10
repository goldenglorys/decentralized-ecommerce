import { combineReducers } from 'redux';
import * as types from '../actions/types';

const all = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_SUCCESS:
      return [...action.products];

    case types.FETCH_PRODUCTS:
    case types.FETCH_PRODUCTS_FAIL:
      return [];

    case types.ADD_PRODUCT_SUCCESS:
      return [...state, action.product];

    case types.PRODUCT_UPDATED: {
      const newState = [...state];
      const oldProduct = newState.find(product => product.id === action.product.id);

      if (!oldProduct) {
        return state;
      }

      oldProduct.status = action.product.status;

      return newState;
    }

    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return true;

    case types.FETCH_PRODUCTS_SUCCESS:
    case types.FETCH_PRODUCTS_FAIL:
      return false;

    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_FAIL:
      return action.message;

    case types.FETCH_PRODUCTS:
    case types.FETCH_PRODUCTS_SUCCESS:
      return null;

    default:
      return state;
  }
};

const addStatus = (state = '', action) => {
  switch (action.type) {
    case types.ADD_PRODUCT:
      return 'ADDING';

    case types.ADD_PRODUCT_FAIL:
      return 'FAIL';

    case types.ADD_PRODUCT_SUCCESS:
      return 'SUCCESS';

    case types.RESET_ADD_STATUS:
      return '';

    default:
      return state;
  }
};

const addErrorMessage = (state = null, action) => {
  switch (action.type) {
    case types.ADD_PRODUCT_FAIL:
      return action.message;

    case types.ADD_PRODUCT:
    case types.ADD_PRODUCT_SUCCESS:
      return null;

    default:
      return state;
  }
};

const products = combineReducers({
  all,
  isFetching,
  errorMessage,
  addErrorMessage,
  addStatus,
});

export default products;
