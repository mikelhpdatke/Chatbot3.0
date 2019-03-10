import { Table, Typography } from 'antd';
import { connect } from 'dva';
import React from 'react';
import styles from './RecentlyAIML.less';

const { Text } = Typography;

const columns = [{
  title: 'Pattern',
  dataIndex: 'aiml_question',
}, {
  title: 'Template',
  dataIndex: 'aiml_answer',
}];


@connect(({ recentlyAIML, loading }) => ({
  recentlyAIML,
  loading: loading.models.recentlyAIML,
}))
class RecentlyAIMLTable extends React.Component {
  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  }

  render() {
    const { recentlyAIML } = this.props;
    // console.log(recentlyAIML);
    let { data } = recentlyAIML;
    data = data.map(({ id_topics_q_a: key, ...rest }) => ({ key, ...rest }));
    return (
      // <div className={styles.root}>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        onChange={this.onChange}
      />
      // </div>
    )
  }
}
export default RecentlyAIMLTable;
