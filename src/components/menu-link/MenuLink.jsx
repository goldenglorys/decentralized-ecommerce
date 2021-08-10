/* eslint-disable react/no-children-prop */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import { Menu } from 'antd';

const MenuLink = ({
  label, to, activeOnlyWhenExact, ...rest
}) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Menu.Item {...rest} eventKey={match ? 'active' : ''}>
        <Link to={to} href>
          {label}
        </Link>
      </Menu.Item>
    )}
  />
);

MenuLink.propTypes = {
  label: PropTypes.string,
  to: PropTypes.string,
  activeOnlyWhenExact: PropTypes.bool,
};

MenuLink.defaultProps = {
  label: '',
  to: '',
  activeOnlyWhenExact: false,
};

export default MenuLink;
