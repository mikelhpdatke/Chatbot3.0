export default {
  namespace: 'SecondDrawer',
  state: {
    open: false,
    chatbot: '',
  },
  reducers: {
    handle(state, action) {
      return {
        ...state,
        open: action.payload.open,
        chatbot: action.payload.chatbot,
      };
    },
  },
};
