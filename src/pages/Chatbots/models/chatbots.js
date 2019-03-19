import { getChatbots, getTopics } from '@/services/chatbot';
// import { connect } from 'dva';
import { message } from 'antd';

export default {
  namespace: 'chatbots',
  state: {
    chatbots: [],
    topics: [],
    chatbot: '',
    topic: '',
  },
  effects: {
    *fetchChatbots(obj, { call, put }) {
      const response = yield call(getChatbots, obj);
      // console.log('in effect...', response);
      if (!response || !response.status) message.error('Lấy thông tin chatbot bị lỗi')
      yield put({
        type: 'getChatbots',
        payload: response.data,
      });
    },
    *fetchTopics({ payload }, { call, put}) {
      const response = yield call(getTopics, payload);
      if (!response || !response.status) message.error('Lấy thông tin topic bị lỗi')  
      yield put({
        type: 'getTopics',
        payload: response.data,
      })
    }
  },
  reducers: {
    saveChatbot(state, action) {
      return {
        ...state,
        chatbot: action.payload,
      };
    },
    saveTopic(state, action) {
      return {
        ...state,
        topic: action.payload,
      };
    },
    getChatbots(state, action) {
      return {
        ...state,
        chatbots: action.payload,
      };
    },
    getTopics(state, action) {
      return {
        ...state,
        topics: action.payload,
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/chatbots/inputQA') {
          dispatch({
            type: 'fetchChatbots',
          });
        }
      });
    },
  },
};
