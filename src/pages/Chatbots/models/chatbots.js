const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });

export default {
  namespace: 'chatbots',
  state: {
    chatbots: [],
  },
  effects: {
    *fetchChatbots({ call, put }) {
      // yield call(wait, 2000);
      console.log('in effect...');
      yield put({
        type: 'getChatbots',
        payload: [
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
        ],
      });
    },
  },
  reducers: {
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
        if (pathname === '/chatbots/chatbots/list') {
          console.log(pathname);
          dispatch({
            type: 'fetchChatbots',
          });
        }
      });
    },
  },
};
