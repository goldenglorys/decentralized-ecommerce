import { combineReducers } from 'redux';
import products from './products';
import orders from './orders';

export default combineReducers({
  products,
  orders,
});
