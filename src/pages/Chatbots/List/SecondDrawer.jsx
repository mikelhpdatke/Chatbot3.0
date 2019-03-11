import React, { Suspense } from 'react';
import {
  Form,
  Icon,
  Button,
  // Select,
  Drawer,
  // Steps,
  message,
} from 'antd';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import Link from 'umi/link';
import router from 'umi/router';
import { connect } from 'dva';
import styles from './SecondDrawer.less';
import Result from '@/components/Result';
import PageLoading from '@/components/PageLoading';

// const { Option } = Select;
// const { Step } = Steps;

const Modify = React.lazy(() => import('./Modify'));
// const Info = React.lazy(() => import('./Info'));

// const AutoCompleteOption = AutoComplete.Option;

@connect(({ SecondDrawer }) => ({
  SecondDrawer,
}))
class SecondDrawerComponent extends React.Component {
  state = {
    current: 0,
  };

  render() {
    // const { getFieldDecorator } = this.props.form;
    const { SecondDrawer } = this.props;
    const drawerWidth = window.innerWidth > 760 ? '60vw' : '90vw';
    return (
      <Drawer
        title={"Chỉnh sửa chatbot: " + SecondDrawer.chatbot}
        width={drawerWidth}
        onClose={() => {
          this.props.dispatch({ type: 'SecondDrawer/handle', payload: { open: false, chatbot: '' } });
        }}
        visible={SecondDrawer.open}
        style={{
          overflow: 'auto',
          height: '100%',
          // paddingBottom: '108px',
        }}
      >
        <Suspense fallback={<PageLoading />}>
          <Modify />
        </Suspense>
      </Drawer>
    );
  }
}

export default Form.create({ name: 'ModifyBotForm' })(SecondDrawerComponent);
