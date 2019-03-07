import React, { Suspense } from 'react';
import { Select, Row, Col, Form, Input } from 'antd';
import styles from './CustomQuestion.less';
import PageLoading from '@/components/PageLoading';
import { connect } from 'dva';

const Option = Select.Option;

const RecentlyAIMLTable = React.lazy(() => import('./RecentlyAIML/RecentlyAIML.jsx'));


@connect(({ chatbots, loading, dispatch }) => ({
  chatbots,
  dispatch,
  loading: loading.effects['chatbots/fetchChatbots']
}))
class CustomQuestion extends React.Component {
  handleChange = (value) => {
    // console.log(`selected ${value}`);
    this.props.dispatch({
      type: 'chatbots/saveChatbot',
      payload: value
    })
    this.props.dispatch({
      type: 'chatbots/saveTopic',
      payload: '',
    })
  }

  handleChangeTopic = (value) => {
    this.props.dispatch({
      type: 'chatbots/saveTopic',
      payload: value,
    })
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const { chatbots, loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    // console.log(chatbots, loading);
    const { chatbot, topic } = chatbots;
    // console.log(chatbot, chatbots);
    // console.log(chatbot, topic);
    // console.log(chatbots.chatbots);
    return (
      <div className={styles.normal}>
        <Form {...formItemLayout}>
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item label='Chọn Chatbot'>
                <Select
                  style={{ width: '100%' }}
                  showSearch
                  // suffixIcon={<Icon type="android" theme="filled" />}
                  // placeholder="Chọn chatbot"
                  optionFilterProp="children"
                  onChange={this.handleChange}
                  loading={loading}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {chatbots.chatbots.map(({ chatbot_name }, index) => {
                    // console.log(chatbot_name);
                    return <Option key={index} value={chatbot_name}>{chatbot_name}</Option>
                  }
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Form.Item label='Chọn Topic'>
                <Select
                  style={{ width: '100%' }}
                  showSearch
                  // suffixIcon={<Icon type="android" theme="filled" />}
                  // placeholder="Chọn Topic"
                  optionFilterProp="children"
                  onChange={this.handleChangeTopic}
                  loading={chatbot ? false : true}
                  value={topic}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {chatbots.chatbots
                    .filter(({ chatbot_name }) => chatbot_name === chatbot)
                    .map(({ topic_list }) => {
                      return topic_list.map((topic, index) => <Option key={index} value={topic}>{topic}</Option>)
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div className={styles.content}>
            <div className={styles.contentIcon}>
              <span >Câu hỏi</span>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.contentIcon}>
              <span >Câu trả lời</span>
            </div>
            <Form.Item className={styles.flexbox}>
              {
                getFieldDecorator('answer', {
                  rules: [{
                    required: true,
                    message: 'Nhập câu trả lời'
                  }]
                })(
                  <Input placeholder='Câu trả lời..' />
                )
              }
            </Form.Item>
          </div>
        </Form>
        <div className={styles.content}>
          <div className={styles.contentIcon}>
            <span >Gần đây</span>
          </div>
          <Form.Item >
            <Suspense fallback={<PageLoading />}>
              <RecentlyAIMLTable />
            </Suspense>
          </Form.Item>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'CustomQuestion' })(CustomQuestion);;
