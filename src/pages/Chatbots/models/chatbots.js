import { getChatbots, getTopics } from '@/services/chatbot';
// import { connect } from 'dva';

export default {
  namespace: 'chatbots',
  state: {
    chatbots: [],
    topics: [],
    chatbot: {
      id: -1,
      name: '',
    },
    topic: {
      id: -1,
      name: '',
    },
  },
  effects: {
    *fetchChatbots(obj, { call, put }) {
      const response = yield call(getChatbots, obj);
      // console.log('in effect...', response);
      yield put({
        type: 'getChatbots',
        payload: response,
      });
    },
    *fetchTopics({ payload }, { call, put}) {
      const response = yield call(getTopics, payload);
      yield put({
        type: 'getTopics',
        payload: response,
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
