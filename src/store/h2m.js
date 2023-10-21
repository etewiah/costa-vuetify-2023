// import axios from 'axios'
import apiPublicService from "@jsroot/shared/services/api-public"
// initial state
const state = {
  // currentPage: {},
  currentProperty: {},
  currentPropertyPage: {},
}

// getters
const getters = {}

// actions
const actions = {
  loadRentalProperty: function({ commit }, propertyId) {
    let apiUrl = this.getters.baseApiUrlV3 + '/prop_rentals/' + propertyId
    apiPublicService().get(apiUrl).then((response) => {
      commit('setCurrentProperty', { result: response.data })
      commit('setCurrentPropertyPage', { result: response.data })
    }, (err) => {
      if (err.response.status === 404) {
        commit('set404', { is404: true })
      } else {
        commit('setPropertyRetrievalError', { err: err })
      }
      // console.log(err)
    })
  },
  // loadCityListings: function({ commit }, searchParams) {
  //   let apiUrl = this.getters.baseApiUrlV3 + '/prop_rentals/list_by_city/' + searchParams.city
  //   apiPublicService().get(apiUrl, {}).then((response) => {
  //     // commit('setSearchFields', { result: response.data })
  //     // below in core store:
  //     commit('setSearchPageContent', { result: response.data })
  //     commit('setSearchResults', { result: response.data })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }
}

// mutations
const mutations = {
  setPropertyRetrievalError: (state, { err }) => {
    state.currentProperty = err
  },
  setCurrentProperty: (state, { result }) => {
    state.currentProperty = result.property
  },
  setCurrentPropertyPage: (state, { result }) => {
    state.currentPropertyPage = result.page
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}