import { login } from '@/services'

export default {
  state: {
    username: '',
    token: ''
  },
  getters: {
    username: state => state.username
  },
  mutations: {
    LOGIN(state, value) {
      state.token = value
    }
  },
  actions: {
    async login({ commit }, value) {
      const { success, result } = await login(value)
      if (success) {
        const { token } = result
        commit('LOGIN', token)
      }
      return success
    }
  }
}
