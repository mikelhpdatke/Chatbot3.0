import styles from './Chatbots.less';
import { Table, Divider, Icon, Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

const columns = [
  {
    title: 'Tên',
    dataIndex: 'chatbot',
    key: 'chatbot',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Chủ đề',
    dataIndex: 'topic',
    key: 'topic',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: 'Chỉnh sửa',
    key: 'action',
    render: (text, record) => (
      <div>
        <Icon
          type="delete"
          theme="twoTone"
          onClick={() => {
            console.log(record);
          }}
        />
        <Divider type="vertical" />
        <Icon
          type="edit"
          theme="twoTone"
          onClick={() => {
            window.g_app._store.dispatch(
              routerRedux.push({
                pathname: '/chatbots/create/info',
              })
            );
          }}
        />
      </div>
    ),
  },
];

const data = [
  {
    key: '1',
    chatbot: 'Thái Bình',
    topic: 'Câu hỏi chung',
    note: 'Lưu 19/8',
  },
  {
    key: '2',
    chatbot: 'Cần thơ',
    topic: 'Câu hỏi chung',
    note: 'Lưu 19/8',
  },
  {
    key: '3',
    chatbot: 'Quảng ninh',
    topic: 'Câu hỏi chung',
    note: 'Lưu 19/8',
  },
];

const ChatbotList = ({ chatbots }) => {
  console.log(' in chatbots list ', chatbots);
  return (
    <div className={styles.normal}>
      <Table columns={columns} dataSource={data} bordered className={styles.table} />
      <Row type="flex" justify="space-around" align="middle">
        <Col>
          <Button type="primary" className={styles.button}>
            Tạo Chatbot mới
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default connect(state => ({ chatbots: state.chatbots }))(ChatbotList);
