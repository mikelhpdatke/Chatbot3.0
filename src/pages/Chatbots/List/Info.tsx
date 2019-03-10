import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Card,
  Row,
  Col,
  Button,
  Select,
} from 'antd';
import styles from './Info.less';
import router from 'umi/router';
const { Option } = Select;
import { connect } from 'dva';

@connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  currentUserLoading: loading.effects['user/fetchCurrent'],
}))
class Info extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        router.push('/create/defaultQuestion');
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWAddressChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { currentUser, currentUserLoading } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '84',
    })(
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    );

    return (

      <Card title='Thông tin cơ bản'>
        {/* <div className={styles.normal}> */}
          <Form {...formItemLayout} onSubmit={this.handleSubmit} layout="horizontal">
            <Row type="flex" justify="center">
              <Col span={12}>
                <Form.Item
                  label={
                    <span>
                      Tên&nbsp;
                      <Tooltip title="Tên của Chatbot bạn muốn đặt">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  }
                >
                  {getFieldDecorator('chatbotName', {
                    rules: [
                      { required: true, message: 'Đặt tên cho chatbot của bạn!', whitespace: true },
                    ],
                  })(<Input />)}
                </Form.Item>
                <Form.Item label="Lĩnh vực">
                  {getFieldDecorator('fields', {
                    rules: [{ required: true, message: 'Chọn lĩnh vực', type: 'array' }],
                  })(
                    <Select mode="multiple" placeholder="Chọn lĩnh vực cho bạn">
                      <Option value="Bán hàng">Bán hàng</Option>
                      <Option value="Kiểm toán">Kiểm toán</Option>
                      <Option value="Hành chính">Hành chính</Option>
                    </Select>
                  )}
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  {getFieldDecorator('phone', {
                    rules: [{ required: true, message: 'Điền số điện thoại!' }],
                  })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                </Form.Item>
                <Form.Item label="Địa chỉ">
                  {getFieldDecorator('address', {
                    rules: [{ required: true, message: 'Điền địa chỉ' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={4} offset={20}>
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    className={styles.nextButton}
                  >
                    Tiếp tục
                    <Icon type="right" />
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        {/* </div> */}
      </Card>
    );
  }
}

export default Form.create({ name: 'register' })(Info);
