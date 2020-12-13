export default {
  state: {
    isCollapse: false
  },
  getters: {
    isCollapse: state => state.isCollapse
  },
  mutations: {
    TOGGLE(state, value) {
      state.isCollapse = value
    }
  },
  actions: {
    toggle({ commit }, value) {
      commit('TOGGLE', value)
    }
  }
}
