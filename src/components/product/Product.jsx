import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { fromWei } from '../../utils/web3';
import * as orderActionsCreator from '../../actions/orders';
import IconText from '../icon-text';
import styles from './product.scss';

const { Meta } = Card;

const STATUS = {
  0: 'Available',
  1: 'Buying',
  2: 'Shipping',
  3: 'Sold',
};

const Product = ({ product, placeOrder }) => {
  return (
    <Card
      cover={<img style={{minHeight: '193px'}} alt={product.name} src={product.imageLink} />}
      actions={[
        <span>{STATUS[product.status.toNumber()]}</span>,
        <span>{fromWei(product.price, 'finney').toString()} finney</span>,
        <IconText
          type="shopping-cart"
          text="Buy"
          onClick={() => placeOrder(product)}
        />,
      ]}
    >
      <Meta title={product.name} description={product.descLink} />
    </Card>
  )};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  placeOrder: PropTypes.func.isRequired,
};

export default connect(null, orderActionsCreator)(Product);
