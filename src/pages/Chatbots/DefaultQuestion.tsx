import { Form, Input, Icon, Button, PageHeader, Row, Col } from 'antd';
import styles from './DefaultQuestion.less';
// import Link from 'umi/link';
import router from 'umi/router';

let id = 0;

class DefaultQuestion extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        router.push('/create/customQuestion');
      }
    });
  };

  componentDidMount() {
    // console.log('DefaultQuestion mound.');
    // console.log(this.props.form);
    this.add();
    this.add();
  }
  render() {
    console.log('DefaultQuestion render..');
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
      },
    };
    const labelLayout = {
      xs: { span: 12 },
      md: { span: 3 },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    // console.log(keys);
    const formItems = keys.map((k, index) => (
      <Col span={12}>
        <Form.Item
          style={{ width: '100%' }}
          {...formItemLayout}
          label={''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            initialValue: index === 0 ? 'Xin chào' : index === 1 ? 'Chào bạn' : '',
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Nhập câu chào',
              },
            ],
          })(<Input placeholder="Câu chào mẫu" style={{ width: '80%', marginRight: 8 }} />)}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
      </Col>
    ));
    return (
      <div className={styles.normal}>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={24}>
              <PageHeader
          onBack={() => router.push('/create/info')}
          title="Nhập câu trả lời mặc định"
                // subTitle="This is a subtitle"
              />
            </Col>
            <Col {...labelLayout}>
              <div className={styles.label}>Câu chào</div>
            </Col>
            <Col span={24} />
            <Col span={20} offset={4}>
              <Row gutter={48}>{formItems}</Row>
              <Row>
                <Col>
                  <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button size="small" type="primary" onClick={this.add}>
                      <Icon type="plus" /> Thêm câu hỏi
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item {...formItemLayoutWithOutLabel}>
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
            </Col>
            <Col {...labelLayout}>
              <div className={styles.label}>Câu trả lời</div>
            </Col>
            <Col span={24} />
            <Col span={20} offset={4}>
              <Form.Item
                style={{ width: '100%' }}
                {...formItemLayout}
                label={''}
                required={false}
                key={'answer'}
              >
                {getFieldDecorator(`answer`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: 'Nhập câu trả lời',
                    },
                  ],
                })(<Input placeholder="Câu trả lời" style={{ width: '100%', marginRight: 8 }} />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create({ name: 'dynamic_form_item' })(DefaultQuestion);
