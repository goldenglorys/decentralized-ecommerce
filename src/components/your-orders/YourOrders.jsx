import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Steps, Radio } from 'antd';
import * as orderActionsCreator from '../../actions/orders';
import { fromWei } from '../../utils/web3';
import IconText from '../icon-text';
import styles from './your-orders.scss';

const { Step } = Steps;
const { Button: RadioButton, Group: RadioGroup } = Radio;

class YourOrders extends Component {
  static propTypes = {
    view: PropTypes.string,
    orders: PropTypes.array,
    isFetching: PropTypes.bool,
    changeView: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
    acceptOrder: PropTypes.func.isRequired,
    rejectOrder: PropTypes.func.isRequired,
  };

  static defaultProps = {
    view: 'buyer',
    orders: [],
    isFetching: false,
  };

  componentDidMount() {
    const { view, fetchOrders } = this.props;

    fetchOrders(view);
  }

  switchView = event => {
    const { changeView, fetchOrders } = this.props;
    const view = event.target.value;

    changeView(view);
    fetchOrders(view);
  };

  render() {
    const {
      view, orders, isFetching, acceptOrder, rejectOrder,
    } = this.props;

    return (
      <div>
        <RadioGroup
          style={{marginBottom: '20px'}}
          onChange={this.switchView}
          defaultValue={view}
        >
          <RadioButton value="buyer">Buyer</RadioButton>
          <RadioButton value="seller">Seller</RadioButton>
        </RadioGroup>

        <List
          loading={isFetching}
          itemLayout="vertical"
          size="middle"
          dataSource={orders}
          renderItem={item => (
            <List.Item
              actions={[
                <IconText
                  type="check-circle-o"
                  text={view === 'buyer' ? 'Received' : 'Accept'}
                  onClick={() => acceptOrder(item)}
                />,
                <IconText
                  type="close-circle-o"
                  text="Reject"
                  onClick={() => rejectOrder(item)}
                />,
              ]}
              extra={
                <img
                  width={272}
                  alt={item.product.name}
                  src={item.product.imageLink}
                />
              }
            >
              <List.Item.Meta
                title={item.product.name}
                description={item.product.descLink}
              />

              <Steps
                style={{marginBottom: '15px'}}
                size="small"
                current={item.product.status.toNumber()}
                status={item.product.status.toNumber() === 0 ? 'error' : null}
              >
                <Step title="Available" />
                <Step title="Buying" />
                <Step title="Shipping" />
                <Step title="Finished" />
              </Steps>

              <div>
                {fromWei(item.product.price, 'finney').toString()} finney
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  view: state.orders.view,
  orders: state.orders.all,
  isFetching: state.orders.isFetching,
});

export default connect(mapStateToProps, orderActionsCreator)(YourOrders);
