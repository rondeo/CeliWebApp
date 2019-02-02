import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  comment: {},
});

export const mutations = {
  set(state, business) {
    state.list = business
  }
};

export const actions = {
  async get({commit}, params) {
    await this.$axios.get(`/image/business/slug/${params.slug}/`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  }
};