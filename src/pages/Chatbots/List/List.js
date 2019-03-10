import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';
import router from 'umi/router';
import Ellipsis from '@/components/Ellipsis';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import DrawerNewChatbot from './Drawer';

@connect(({ list, drawerList, loading }) => ({
  list,
  drawerList,
  loading: loading.models.list,
}))
class CardList extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      list: { list },
      loading,
      drawerList,
    } = this.props;
    // console.log(drawerList, '??');
    return (
      <React.Fragment>
        <DrawerNewChatbot />
        <PageHeaderWrapper>
          <div className={styles.cardList}>
            <List
              rowKey="id"
              loading={loading}
              grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
              dataSource={['', ...list]}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card hoverable className={styles.card} actions={[<a onClick={() => {
                      router.push('/chatbots/inputQA');
                    }}>Nhập dữ liệu</a>, <a>Chỉnh sửa</a>]}>
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avarta} />}
                        title={<a>{item.title}</a>}
                        description={
                          <Ellipsis className={styles.item} lines={3}>
                            {item.description}
                          </Ellipsis>
                        }
                      />
                    </Card>
                  </List.Item>
                ) : (
                    <List.Item>
                      <Button
                        type="dashed"
                        className={styles.newButton}
                        onClick={() => {
                          this.props.dispatch({
                            type: 'drawerList/handle',
                            payload: true
                          })
                        }}
                      >
                        <Icon type="plus" /> Thêm Chatbot
                      </Button>
                    </List.Item>
                  )
              }
            />
          </div>
        </PageHeaderWrapper>
      </React.Fragment>
    );
  }
}

export default CardList;
