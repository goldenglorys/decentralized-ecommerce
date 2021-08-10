import * as types from '../actions/types';
import { getStoreContract } from './contracts';

export const listenToContractEvents = async dispatch => {
  const Store = getStoreContract();
  const store = await Store.deployed();
  store.ProductUpdated().watch((error, event) => {
    if (error) {
      return;
    }

    const {
      id,
      index,
      name,
      category,
      imageLink,
      descLink,
      price,
      status,
    } = event.args;

    dispatch({
      type: types.PRODUCT_UPDATED,
      product: {
        id,
        index,
        name,
        category,
        imageLink,
        descLink,
        price,
        status,
        unit: 'wei',
      },
    });
  });
};
