import { getRecentlyAIML } from '@/services/chatbot';
// import { connect } from 'dva';

export default {
  namespace: 'recentlyAIML',
  state: {
    data: [],
  },
  effects: {
    *recentlyAIML(obj, { call, put }) {
      const response = yield call(getRecentlyAIML, obj);
      yield put({
        type: 'saveRecentlyAIML',
        payload: response,
      })
    }
  },
  reducers: {
    saveRecentlyAIML(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/inputQA') {
          dispatch({
            type: 'recentlyAIML',
          });
        }
      });
    },
  },
}
