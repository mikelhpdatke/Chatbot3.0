import React, { Suspense } from 'react';
import { Icon, Select, Row, Col, Form, Input, Timeline, Alert , Button, Card } from 'antd';
import styles from './InputQA.less';
import PageLoading from '@/components/PageLoading';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
const Option = Select.Option;

const RecentlyAIMLTable = React.lazy(() => import('./RecentlyAIML/RecentlyAIML.jsx'));
const EditableTable = React.lazy(() => import('./Table/Table'));

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
    // console.log(chatbots);
    // console.log(chatbot, topic);
    // console.log(chatbots.chatbots);
    return (
      <PageHeaderWrapper
        // title={'Nhập câu hỏi tuỳ chọn cho chatbot của bạn'}
        title={<Alert message="Bạn có thể nhập nhiều câu hỏi và 1 câu trả lời" type="info" showIcon closable />}
        // content={'Bạn có thể thực hiện các thao tác thêm, sửa, xoá và nhập dữ liệu'}
      >
      <div className={styles.normal}>
        <Timeline>
          <Form {...formItemLayout}>
            <Timeline.Item color="red">
              <Card size='small'
              bordered={false}
                title={<div className={styles.timelineTitle}>
                Chatbot và chủ đề</div>}
                >
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
                        loading={chatbot.id === -1 ? false : true}
                        value={topic.name}
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
              </Card>
            </Timeline.Item>
            <Timeline.Item color="red">
              <Card size='small' bordered={false}
                title={<div className={styles.timelineTitle}>
                Câu hỏi</div>}
                >
              <Suspense fallback={<PageLoading />}>
                    <EditableTable />
                  </Suspense>
              </Card>
            </Timeline.Item>
            <Timeline.Item color="green">
              <Card size='small' bordered={false}
                title={<div className={styles.timelineTitle}>
                Câu trả lời</div>}>
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
              </Card>
            </Timeline.Item>
            <Timeline.Item
            >
              <Card size='small' bordered={false}
                title={<div className={styles.timelineTitle}>
                Gần đây</div>}>
                <Form.Item wrapperCol={{xs:24}}>
                  <Suspense fallback={<PageLoading />}>
                    <RecentlyAIMLTable />
                  </Suspense>
                </Form.Item>
              </Card>
            </Timeline.Item>
            <Timeline.Item
            dot={<Icon type="file-done" style={{ fontSize: '24px' }} />}
            >
              <Card size='small' bordered={false}
                title={<div className={styles.timelineTitle}>
                Hoàn thành</div>}>
                <div className={styles.flexbox}>
                  <Button type="primary" shape="round" icon="save" size={'large'}>Lưu</Button>
                </div>
              </Card>
            </Timeline.Item>
          </Form>
        </Timeline>

      </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create({ name: 'CustomQuestion' })(CustomQuestion);;
