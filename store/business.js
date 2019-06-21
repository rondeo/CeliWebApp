import merge from "lodash.merge";
import assign from 'lodash.assign';

export const state = () => ({
  list: [],
  business: {},
  total: null
});

export const mutations = {
  set(state, business) {
    state.list = business
  },
  setTotal(state, total) {
    state.total = total
  },
  add(state, value) {
    merge(state.list, value)
  },
  push(state,value){
    state.list.push(value)
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
    await this.$axios.get(`/api/business/slug/${params.slug}/`)
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
    businessSearch.stateSlug = params.value.provincia
    await this.$axios.post(`/api/business/${params.value.element}/30/`, businessSearch)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.bussinesses)
        }
      })
  },
  async setTotalSearchState({commit}, params) {
    var businessSearch= {}
    businessSearch.stateSlug = params.value
    await this.$axios.post(`/api/business/0/-99999/`, businessSearch)
      .then((res) => {
        if (res.status === 200) {
          commit('setTotal', res.data.total)
        }
      })
  },
  async getByCity({commit}, params) {
    var businessSearch= {}
    businessSearch.citySlug = params.value.ciudad
    await this.$axios.post(`/api/business/${params.value.element}/30/`, businessSearch)
      .then((res) => {
        if (res.status === 200) {
          commit('set', res.data.bussinesses)
        }
      })
  },
  async setTotalSearchCity({commit}, params) {
    var businessSearch= {}
    businessSearch.citySlug = params.value
    await this.$axios.post(`/api/business/0/-99999/`, businessSearch)
      .then((res) => {
        if (res.status === 200) {
          commit('setTotal', res.data.total)
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
    return this.$axios.post(`/api/business`, {business: params})
  },
  update({commit}, params) {
    return this.$axios.put(`/api/business/${params.id}`, {business: params})
  },
  delete({commit}, params) {
    return this.$axios.delete(`/api/business/${params.id}`)
  }
};