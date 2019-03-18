import { getTopics } from '@/services/chatbot';
import { message } from 'antd';

export default {
  namespace: 'SecondDrawer',
  state: {
    open: false,
    chatbot: '',
    topics: [],
  },
  effects: {
    *fetchTopics({ payload }, { call, put }) {
      // console.log(payload);
      const { chatbot: TenChatbot } = payload;
      // console.log(TenChatbot);
      const response = yield call(getTopics, { TenChatbot });
      // console.log('fetchtopic..', response);
      if (!response || !response.status) {
        message.error('Lấy danh sách chủ đề lỗi!!');
      }
      yield put({
        type: 'saveTopics',
        payload: response.data,
      });
      yield put({
        type: 'handle',
        payload: {
          open: true,
          chatbot: payload.chatbot,
        },
      });
    },
  },
  reducers: {
    handle(state, action) {
      return {
        ...state,
        open: action.payload.open,
        chatbot: action.payload.chatbot,
      };
    },
    saveTopics(state, action) {
      return {
        ...state,
        topics: action.payload,
      };
    },
  },
};
