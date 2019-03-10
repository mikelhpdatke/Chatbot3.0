export default {
  namespace: 'drawerList',
  state: {
    open: false,
  },
  reducers: {
    handle(state, action) {
      return {
        ...state,
        open: action.payload,
      }
    }
  }
}
