import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      view: 'beginGame'
    }
  },
  mutations: {
    change_view (state, payload) {
      state.view = payload
    }
  },
  actions: {},
  modules: {}
})
