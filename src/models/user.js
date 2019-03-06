import { query as queryUsers, queryCurrent } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      // const response = yield call(queryUsers);
      const response = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ];
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      const response = {
        name: 'Đạt Lương Đức Tuấn',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'luongductuandat.psa@gmail.com',
        signature: 'TomCat',
        title: 'ApacheTomcat',
        group: 'ProPTIT',
        tags: [
          {
            key: '0',
            label: 'Pro',
          },
          {
            key: '1',
            label: 'Pro',
          },
          {
            key: '2',
            label: 'ProPTIT',
          },
          {
            key: '3',
            label: 'Pro',
          },
          {
            key: '4',
            label: 'Pro',
          },
          {
            key: '5',
            label: 'Pro',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'VN',
        geographic: {
          province: {
            label: 'YD',
            key: '330000',
          },
          city: {
            label: 'BG',
            key: '330100',
          },
        },
        address: '89 Phùng Hưng',
        phone: '84337348333',
      };
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
