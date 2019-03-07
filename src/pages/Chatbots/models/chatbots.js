import { getChatbots, getRecentlyAIML } from '@/services/chatbot';
// import { connect } from 'dva';

export default {
  namespace: 'chatbots',
  state: {
    chatbots: [],
    chatbot: '',
    topic: '',
    recentlyAIML: [],
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
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/chatbots/chatbots/list' || pathname === '/inputQA') {
          dispatch({
            type: 'fetchChatbots',
          });
        }
      });
    },
  },
};
