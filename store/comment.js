import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  comment: {},
});

export const mutations = {
  set(state, business) {
    state.list = business
  },
  merge(state, form) {
    assign(state.comment, form)
  }
};

export const actions = {
  async get({commit}, params) {
    await this.$axios.get(`/api/comment/business/slug/${params.slug}/${params.element}/10/`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  async getFromUser({commit}, params) {
    await this.$axios.get(`/api/comment/business/${params.slug}/user/${params.unique_id}/`)
      .then((res) => {
        if (res.status === 200) {
          commit('merge', res.data)
        }
      })
  }
};