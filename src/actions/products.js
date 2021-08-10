/* eslint-disable no-await-in-loop */
import { getStoreContract } from '../utils/contracts';
import { getWeb3 } from '../utils/web3';
import { promisify } from '../utils/promises';
import * as types from './types';

export const resetAddStatus = () => ({
  type: types.RESET_ADD_STATUS,
});

export const addProduct = product => async dispatch => {
  const web3 = getWeb3();
  const Store = getStoreContract();
  const priceInWei = web3.toWei(product.price, product.unit);

  dispatch({
    type: types.ADD_PRODUCT,
  });

  try {
    const store = await Store.deployed();
    const coinbase = await promisify(web3.eth.getCoinbase)();

    store.ProductCreated().watch((error, event) => {
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
        type: types.ADD_PRODUCT_SUCCESS,
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

    await store.addProduct(
      product.name,
      product.category,
      product.imageLink,
      product.description,
      priceInWei,
      {
        from: coinbase,
      },
    );
  } catch (ex) {
    dispatch({
      type: types.ADD_PRODUCT_FAIL,
      message: ex.toString ? ex.toString() : ex,
    });
  }
};

export const fetchProducts = () => async dispatch => {
  const Store = getStoreContract();

  dispatch({
    type: types.FETCH_PRODUCTS,
  });

  try {
    const store = await Store.deployed();
    const productCount = await store.getProductCount.call();

    const products = [];
    for (let i = 0; i < productCount; i++) {
      const id = await store.getProductIdAt.call(i);
      const [
        name,
        category,
        imageLink,
        descLink,
        price,
        index,
        status,
      ] = await store.getProduct.call(id);

      products.push({
        id,
        name,
        category,
        imageLink,
        descLink,
        price,
        index,
        status,
        unit: 'wei',
      });
    }

    dispatch({
      type: types.FETCH_PRODUCTS_SUCCESS,
      products,
    });
  } catch (ex) {
    dispatch({
      type: types.FETCH_PRODUCTS_FAIL,
      message: ex,
    });
  }
};
