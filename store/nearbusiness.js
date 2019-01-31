import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  business: {},
});

export const mutations = {
  set(state, business) {
    state.list = business
  }
};

export const actions = {
  async get({commit}, params) {
    await this.$axios.get(`/v1/coordinates/near/${params.slug}/`)
      .then((res) => {
        if (res.status === 200) {
          res.data.average = Math.floor(res.data.average* 100) / 100;
          res.data.midaverage = res.data.average/2;
          commit('set', res.data)
        }
      })
  }
};