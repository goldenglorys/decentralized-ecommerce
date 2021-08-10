import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styles from './icon-text.scss';

const IconText = ({ type, text, ...rest }) => (
  <span {...rest}>
    <Icon style={{marginRight: '8px'}} type={type} />
    {text}
  </span>
);

IconText.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
};

IconText.defaultProps = {
  type: '',
  text: '',
};

export default IconText;
