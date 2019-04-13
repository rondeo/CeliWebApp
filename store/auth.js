import {setAuthToken, resetAuthToken} from '~/utils/auth'
import cookies from 'js-cookie'

export const state = () => ({
    user: null
  })
  export const mutations = {
    set_user (store, data) {
      store.user = data
    },
    reset_user (store) {
      store.user = null
    }
  }
  export const actions = {
    async fetch ({commit}) {
        await this.$axios.get('/api/auth/user/')
        .then(response => {
          commit('set_user', response.data)
          return response
        })
        .catch(error => {
          commit('reset_user')
          return error
        })
    },
    async login ({commit}, data) {
       await this.$axios.post('/api/auth/token/', data)
        .then(response => {
          commit('set_user', response.data.token)
          setAuthToken(response.data.token)
          cookies.set('x-access-token', response.data.token, {expires: 7})
        })
    },
    async reset ({commit}) {
      commit('reset_user')
      resetAuthToken()
      cookies.remove('x-access-token')
      return Promise.resolve()
    }
  }