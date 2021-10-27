import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';
import Home from './home';
import YourOrders from './your-orders';
import YourOrdersBuyer from './your-orders-buyer';
import YourOrdersSeller from './your-orders-seller';
import AddProduct from './add-product';
import About from './about';
import MenuLink from './menu-link';
import logo from '../images/logo.svg';
import styles from './app.scss';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const App = () => (
  <Router>
    <Layout className={styles.app}>
      <Header>
        <img 
          title="Decentralize e-commerce store"
          style={{
            cursor: 'pointer',
            height: '63px',
            float: 'left'
          }}
          src={logo} alt="logo" />
        <Search
          style={{
            float: 'left',
            width: 'calc(100% - 80px)',
            height: '36px',
            margin: '14px 0 14px 16px'
          }}
          placeholder="Search Product..."
        />
      </Header>

      <Content 
        style={{padding: '0 50px'}}
      >
        <Menu
          style={{
            margin: '20px 0 15px 0'
          }}
          mode="horizontal"
          defaultSelectedKeys={['active']}
          selectable={false}
        >
          <MenuLink to="/" activeOnlyWhenExact label="Home" />
          {/* <MenuLink to="/your-orders" label="Your Orders" /> */}
          {/* <MenuLink to="/buyer-orders" label="Buyer Orders" /> */}
          {/* <MenuLink to="/seller-orders" label="Seller Orders" /> */}
          <MenuLink to="/add-product" label="Add Product" />
          <MenuLink to="/about" label="About" />
        </Menu>

        <div 
          style={{
            background: '#ffffff',
            padding: '24px',
            minHeight: '480px'
          }} 
        >
          <Route exact path="/" component={Home} />
          <Route path="/your-orders" component={YourOrders} />
          <Route path="/customer" component={YourOrdersBuyer} />
          <Route path="/admin" component={YourOrdersSeller} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/about" component={About} />
        </div>
      </Content>

      <Footer style={{textAlign: 'center'}}>
        DApp Store ©2021 
      </Footer>
    </Layout>
  </Router>
);

export default hot(module)(App);
