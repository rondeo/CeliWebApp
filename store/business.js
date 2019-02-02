import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  business: {},
});

export const mutations = {
  set(state, business) {
    state.list = business
  },
  add(state, value) {
    merge(state.list, value)
  },
  remove(state, {business}) {
    state.list.filter(c => business.id !== c.id)
  },
  mergebusiness(state, form) {
    assign(state.business, form)
  },
  setbusiness(state, form) {
    state.business = form
  }
};

export const actions = {
  async get({commit}) {
    await this.$axios.get(`/business`)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data)
        }
      })
  },
  async show({commit}, params) {
    await this.$axios.get(`/business/slug/${params.slug}/`)
      .then((res) => {
        if (res.status === 200) {
            res.data.average = Math.floor(res.data.average* 100) / 100;
            res.data.midaverage = res.data.average/2;
            commit('mergebusiness', res.data)
        }
      })
  },
  async getByState({commit}, params) {
    var businessSearch= {}
    businessSearch.stateSlug = params.value
    await this.$axios.post(`/business/0/-99999/`, businessSearch)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.bussinesses)
        }
      })
  },
  async set({commit}, business) {
    await commit('set', business)
  },
  async form({commit}, form) {
    await commit('mergebusiness', form)
  },
  async add({commit}, business) {
    await commit('add', business)
  },
  create({commit}, params) {
    return this.$axios.post(`/business`, {business: params})
  },
  update({commit}, params) {
    return this.$axios.put(`/business/${params.id}`, {business: params})
  },
  delete({commit}, params) {
    return this.$axios.delete(`/business/${params.id}`)
  }
};