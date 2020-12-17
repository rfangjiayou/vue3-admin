import { login, logout } from '@/services'
import { setLocalStorage, removeLocalStorage } from '@/utils'

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
        setLocalStorage('token', token)
      }
      return success
    },
    async logout({ commit }) {
      const { success } = await logout()
      if (success) {
        commit('LOGIN', '')
        removeLocalStorage('token')
      }
      return success
    }
  }
}
