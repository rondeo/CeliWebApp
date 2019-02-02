import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  stateUnique: {},
});

export const mutations = {
  set(state, stateUnique) {
    state.stateUnique = stateUnique
  }
};

export const actions = {
  async get({commit}, params) {
    await this.$axios.get(`/state/${params.value}/`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  }
};