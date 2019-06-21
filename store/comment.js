import merge from "lodash.merge";
import assign from 'lodash.assign';

export const strict = false

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
  },
  remove(state, form) {
    state.comment = {
      rating:0,
      unique_id: form.unique_id,
      idEst: form.idEst,
      comment: ""
    };
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
      }).catch(
        error => {
          console.log("no comment")
          commit('remove', params);
        }
    );
  },
  async store({commit}, params) {
    commit('merge', res.data)
  },
  async comment({commit}, params) {
    params.comment.tim = null;
    await this.$axios.post(`/api/comment/auth`, params.comment)
      .then((res) => {
        if (res.status === 200) {
          commit('merge', res.data)
        }
      })
  }
};