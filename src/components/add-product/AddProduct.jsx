import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Icon,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Alert,
  Upload,
} from 'antd';
import ipfsAPI from 'ipfs-api';
import * as productActionsCreator from '../../actions/products';
import { IPFS_HOST, IPFS_PORT, IPFS_GATEWAY_PORT, FLEEK_API_KEY, FLEEK_API_SECRET } from '../../config';
import styles from './add-product.scss';

import fleek from '@fleekhq/fleek-storage-js'; 

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;
const ipfs = ipfsAPI(IPFS_HOST, IPFS_PORT);

class AddProduct extends React.Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    status: PropTypes.string,
    addProduct: PropTypes.func.isRequired,
    resetAddStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    errorMessage: '',
    status: '',
  };

  state = {
    name: '',
    category: '',
    imageLink: '',
    description: '',
    price: 0,
    unit: 'wei',
  };

  componentWillReceiveProps(newProps) {
    const { status } = newProps;

    if (status === 'SUCCESS') {
      this.resetForm();
    }
  }

  resetForm = () => {
    this.setState({
      name: '',
      category: '',
      imageLink: '',
      description: '',
      price: 0,
      unit: 'wei',
    });
  };

  handleChange = field => event => {
    const value = typeof event === 'object' ? event.target.value : event;

    this.setState({
      [field]: value,
    });
  };

  handleImageUpload = ({ file }) => {

    const date = new Date();
    const timestamp = date.getTime();

    const reader = new FileReader();
    reader.onloadend = async () => {
      const input = {
        apiKey: '0i7UJtXUC/6NJpbfgakp+g==',
        apiSecret: '/E0N9m+cI9Ly9dNL+7FWpe9zL938Q1Zbt27/C+y5I/g=',
        key: `file-${timestamp}`,
        data: Buffer.from(reader.result),
      };
      try {
        const result = await fleek.upload(input);
        console.log(result);
        this.setState({
          imageLink: `https://ipfs.fleek.co/ipfs/${result.hash}`,
        });
      } catch(e) {
        console.log('error', e);
      }
      // const [response] = await ipfs.add([Buffer.from(reader.result)]);
      // this.setState({
      //   imageLink: `http://${IPFS_HOST}:${IPFS_GATEWAY_PORT}/ipfs/${
      //     response.hash
      //   }`,
      // });
    };
    reader.readAsArrayBuffer(file);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { resetAddStatus, addProduct } = this.props;

    resetAddStatus();
    addProduct(this.state);
  };

  render() {
    const { errorMessage, status } = this.props;
    const {
      name, category, imageLink, description, price, unit,
    } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form style={{maxWidth: '600px'}} onSubmit={this.handleSubmit}>
        <FormItem label="Name" {...formItemLayout}>
          <Input
            placeholder="Product name"
            value={name}
            onChange={this.handleChange('name')}
          />
        </FormItem>
        <FormItem label="Description" {...formItemLayout}>
          <TextArea
            placeholder="Description"
            value={description}
            onChange={this.handleChange('description')}
          />
        </FormItem>
        <FormItem label="Category" {...formItemLayout}>
          <Input
            placeholder="Category"
            value={category}
            onChange={this.handleChange('category')}
          />
        </FormItem>
        <FormItem label="Image Link" {...formItemLayout}>
          <Input placeholder="Image URL" value={imageLink} disabled />
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Dragger
            customRequest={this.handleImageUpload}
            listType="picture"
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              The file will be uploaded to IPFS, a peer-to-peer hypermedia
              protocol to make the web faster, safer, and more open.
            </p>
          </Dragger>
        </FormItem>
        <FormItem label="Price" {...formItemLayout}>
          <InputNumber
            placeholder="Price"
            value={price}
            onChange={this.handleChange('price')}
          />
          <Select
            value={unit}
            style={{ width: '105px', marginLeft: '10px' }}
            onChange={this.handleChange('unit')}
          >
            <Option value="wei">Wei</Option>
            <Option value="shannon">Shannon</Option>
            <Option value="szabo">Szabo</Option>
            <Option value="finney">Finney</Option>
            <Option value="ether">Ether</Option>
          </Select>
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button
            title="Can't add now, feature coming soon"
            type="primary"
            htmlType="submit"
            loading={status === 'ADDING'}
          >
            Add
          </Button>
        </FormItem>
        {status === 'SUCCESS' && (
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Alert
              message="Product added successfully"
              type="success"
              closable
            />
          </FormItem>
        )}
        {status === 'FAIL' && (
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Alert message={errorMessage} type="error" closable />
          </FormItem>
        )}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.products.addErrorMessage,
  status: state.products.addStatus,
});

export default connect(mapStateToProps, productActionsCreator)(AddProduct);
