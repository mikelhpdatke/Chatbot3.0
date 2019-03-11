import React from 'react';
import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import avarta from '@/assets/bot.png';
import avarta2 from '@/assets/bot2.png';
import avarta3 from '@/assets/bot3.png';
import avarta4 from '@/assets/bot4.png';

export default {
  namespace: 'list',
  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // const response = yield call(queryFakeList, payload);
      const response = [
        {
          id: 0,
          title: 'Hà Nội',
          avarta,
          description: 'Chatbot phục vụ hỏi đáp, nhắc lịch, tư vấn hành lang pháp lý',
        },
        {
          id: 1,
          title: 'Cần thơ',
          avarta: avarta2,
          description:
            'Chatbot phục vụ hỏi đáp, nhắc lịch, tư vấn hành lang pháp lý, hỏi đáp thủ tục hành chính công',
        },
        {
          id: 2,
          title: 'Quảng Ninh',
          avarta: avarta3,
          description: 'Chatbot phục vụ hỏi đáp, nhắc lịch, tư vấn hành lang pháp lý',
        },
        {
          id: 3,
          title: 'Bán hàng',
          avarta: avarta4,
          description:
            'Chatbot phục vụ bán hàng, hỏi đáp về giá cả, phục vụ mua bán, kiểm định chất lượng, so sánh,...',
        },
      ];
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
