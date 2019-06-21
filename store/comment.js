import merge from "lodash.merge";
import assign from 'lodash.assign';

export const strict = false

export const state = () => ({
  list: [],
  comment: {},
  error: false
});

export const mutations = {
  set(state, business) {
    state.list = business
  },
  merge(state, form) {
    if (form.rating == null) {
      form.rating = 0
    }
    assign(state.comment, form)
  },
  remove(state, form) {
    state.comment = {
      rating:0,
      unique_id: form.unique_id,
      idEst: form.idEst,
      comment: ""
    };
  },
  setError(state, form) {
    state.error = form;
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
          params.comment = ""
          params.rating = 0
          commit('remove', params);
        }
    );
  },
  async store({commit}, params) {
    commit('merge', res.data)
  },
  async comment({commit}, params) {
    commit('setError', false)
    console.log("en method " + params.comment + params.rating)
    params.encodedFiles = [];
    params.tim = null;
    await this.$axios.post(`/api/comment/auth`, params)
      .then((res) => {
        if (res.status === 200) {
          commit('merge', res.data)
        }
      }).catch(
        error => {
          commit('setError', true)
        }
      )
  }
};