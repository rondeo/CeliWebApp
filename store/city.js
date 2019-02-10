import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  city: {},
});

export const mutations = {
  set(state, city) {
    state.city = city
  }
};

export const actions = {
  async get({commit}, params) {
    await this.$axios.get(`/city/${params.value}/`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  }
};