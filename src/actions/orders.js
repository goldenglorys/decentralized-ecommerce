import { getStoreContract, getEscrowContract } from '../utils/contracts';
import { getWeb3 } from '../utils/web3';
import { promisify } from '../utils/promises';
import * as types from './types';

export const changeView = view => ({
  type: types.CHANGE_VIEW,
  view,
});

export const placeOrder = product => async dispatch => {
  const web3 = getWeb3();
  const Store = getStoreContract();
  const priceInWei = web3.toWei(product.price, product.unit);

  dispatch({
    type: types.PLACE_ORDER,
  });

  try {
    const store = await Store.deployed();
    const coinbase = await promisify(web3.eth.getCoinbase)();

    store.OrderCreated().watch((error, event) => {
      if (error) {
        return;
      }

      const {
        productId, seller, buyer, escrow,
      } = event.args;

      dispatch({
        type: types.PLACE_ORDER_SUCCESS,
        order: {
          productId,
          seller,
          buyer,
          escrow,
          product,
        },
      });
    });

    await store.placeOrder(product.id, {
      from: coinbase,
      value: priceInWei,
    });
  } catch (ex) {
    dispatch({
      type: types.PLACE_ORDER_FAIL,
      message: ex.toString ? ex.toString() : ex,
    });
  }
};

export const fetchOrders = (from = 'buyer') => async dispatch => {
  const web3 = getWeb3();
  const Store = getStoreContract();

  dispatch({
    type: types.FETCH_ORDERS,
    view: from,
  });

  try {
    const store = await Store.deployed();
    const coinbase = await promisify(web3.eth.getCoinbase)();
    const orderCreatedEvent = store.OrderCreated(
      { [from]: coinbase },
      { fromBlock: 0, toBlock: 'latest' },
    );
    const events = await promisify(orderCreatedEvent.get.bind(orderCreatedEvent))();
    const orders = await Promise.all(events.map(async event => {
      const id = event.args.productId;
      const [
        name,
        category,
        imageLink,
        descLink,
        price,
        index,
        status,
      ] = await store.getProduct.call(id);

      const product = {
        id,
        name,
        category,
        imageLink,
        descLink,
        price,
        index,
        status,
        unit: 'wei',
      };

      return { ...event.args, product };
    }));

    dispatch({
      type: types.FETCH_ORDERS_SUCCESS,
      orders,
    });
  } catch (ex) {
    dispatch({
      type: types.FETCH_ORDERS_FAIL,
      message: ex,
    });
  }
};

export const acceptOrder = order => async dispatch => {
  const web3 = getWeb3();
  const Store = getStoreContract();
  const Escrow = getEscrowContract();

  dispatch({
    type: types.ACCEPT_ORDER,
  });

  try {
    const store = await Store.deployed();
    const escrow = Escrow.at(order.escrow);
    const coinbase = await promisify(web3.eth.getCoinbase)();

    store.ProductUpdated().watch((error, event) => {
      if (error) {
        return;
      }

      const product = { ...event.args, unit: 'wei' };

      dispatch({
        type: types.ACCEPT_ORDER_SUCCESS,
        order: {
          ...order,
          product,
        },
      });
    });

    await escrow.accept({
      from: coinbase,
    });
  } catch (ex) {
    dispatch({
      type: types.ACCEPT_ORDER_FAIL,
      message: ex.toString ? ex.toString() : ex,
    });
  }
};

export const rejectOrder = order => async dispatch => {
  const web3 = getWeb3();
  const Store = getStoreContract();
  const Escrow = getEscrowContract();

  dispatch({
    type: types.REJECT_ORDER,
  });

  try {
    const store = await Store.deployed();
    const escrow = Escrow.at(order.escrow);
    const coinbase = await promisify(web3.eth.getCoinbase)();

    store.ProductUpdated().watch((error, event) => {
      if (error) {
        return;
      }

      const product = { ...event.args, unit: 'wei' };

      if (product.id === order.productId) {
        dispatch({
          type: types.REJECT_ORDER_SUCCESS,
          order: {
            ...order,
            product,
          },
        });
      }
    });

    await escrow.reject({
      from: coinbase,
    });
  } catch (ex) {
    dispatch({
      type: types.REJECT_ORDER_FAIL,
      message: ex.toString ? ex.toString() : ex,
    });
  }
};
