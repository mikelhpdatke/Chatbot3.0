import styles from './Modify.less';
import { Table, Divider, Alert, Button, Row, Col, Tabs, Avatar } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import BotAvarta from '@/assets/bot.png';
const TabPane = Tabs.TabPane;

const columns = [
  {
    title: 'Tên chủ đề',
    dataIndex: 'topic',
  },
  {
    title: 'Nội dung',
    dataIndex: 'topicInfo',
  },
];

const data = [],
  data2 = [];
for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    topic: 'Câu hỏi chung',
    topicInfo: 'mô tả ...',
  });
  data2.push({
    key: i,
    topic: 'Tuỳ chọn',
    topicInfo: 'mô tả tuỳ chọn ...',
  });
}

const listsCb = [
  {
    id: 1,
    name: 'Thái bình',
    data: data,
  },
  {
    id: 2,
    name: 'Hà Nội',
    data: data2,
  },
];
class ChatbotList extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className={styles.normal}>
        <Tabs defaultActiveKey="1" tabPosition={'top'}>
          {listsCb.map(chatbot => (
            <TabPane
              tab={
                <span>
                  <Avatar src={BotAvarta} size='large'/>
                  <Divider type='vertical'/>
                  {chatbot.name}
                </span>
              }
              key={chatbot.id}
            >
              <Table
                bordered
                pagination={{ pageSize: 5 }}
                // scroll={{ y: 240 }}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={chatbot.data}
              />
              <Row type="flex" justify="space-around">
                <Col>
                  <Button type="primary" shape="round" icon="plus-circle" size="default"
                  onClick={() => {router.push('/inputQA')}}
                  >
                    Nhập dữ liệu cá nhân
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" ghost icon="plus-square" shape="round">
                    Thêm mới
                  </Button>
                </Col>
                <Col>
                  <Button type="danger" shape="round" icon="edit" size="default">
                    Sửa
                  </Button>
                </Col>
                <Col>
                  <Button type="danger" shape="round" icon="delete" size="default">
                    Xoá
                  </Button>
                </Col>
              </Row>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default connect(state => ({ chatbots: state.chatbots }))(ChatbotList);
