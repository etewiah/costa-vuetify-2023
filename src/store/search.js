// import axios from 'axios'
import apiPublicService from "@jsroot/shared/services/api-public"

// initial state
const state = {
  propSearchResults: [],
  searchSelectOptions: {},
  // currentSearchFieldsBuy: [],
  // currentSearchFields: [],
  searchFieldsColl: {
    // Aug 2019 ToFigure out:
    // Each canned search page needs to have a diff
    // fieldsCollId but each of those has to be 
    // declared here.  Whats the solution???
    search_promotions: [],
    search_sales: [],
    canned_search: []
  },
  resultsMessage: "",
  resultsObject: {},
  loadingSearch: false
}

// getters
const getters = {
  getPromotionsSearchFields: (state) => {
    // "search_promotions" corresponds to the slug of the
    // relevant search page
    return state.searchFieldsColl["search_promotions"] || []
  },
  // Aug 2019 TODO - should have above take fieldsCollId param too
  getSalesSearchFields: (state) => (fieldsCollId) => {
    // fieldsCollId should be unique to each search page
    return state.searchFieldsColl[fieldsCollId] || []
  },
  getStdSearchListings: (state) => {
    return state.resultsObject.listings || []
  },
  getStdResultsMessage: (state) => {
    return state.resultsObject.results_message
  }
  // getStdQueryInfo: (state) => {
  //   return state.resultsObject.query_info
  // }
}


// actions
const actions = {
  // below used by alerts creator to build query form fields
  loadSalesSearchFields: function ({ commit }, searchParams) {
    let apiUrl = this.getters.baseApiUrlV3 + '/alert_builder_init'
    apiPublicService().get(apiUrl, {
      params: searchParams
    }).then((response) => {
      commit('setSearchFields', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  updateStdSearch: function({ commit }, searchParams) {
    // called by
    // /app/javascript/theme-marbella/pages/PromotionsSearch.vue
    commit('setLoadingStdSearch', { result: true })
    let apiUrl = this.getters.baseApiUrlV3 + '/search/results_from_params'
    apiPublicService().get(apiUrl, {
      params: searchParams
    }).then((response) => {
      commit('setLoadingStdSearch', { result: false })
      commit('setStdResultsObject', { results: response.data })
      // below mutations in search store:
      // commit('setSearchResults', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  // // TODO - replace below with above
  // updateSearch: function({ commit }, searchParams) {
  //   let apiUrl = this.getters.baseApiUrlV3 + '/search/results_from_params'
  //   apiPublicService().get(apiUrl, {
  //     params: searchParams
  //   }).then((response) => {
  //     commit('setSearchResults', { result: response.data })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // },
  loadInitSearchPage: function({ commit }, searchParams) {
    commit('setLoadingStdSearch', { result: true })
    let search_type = searchParams.op || "promotions"
    let apiUrl = this.getters.baseApiUrlV3 + '/search/init/' + search_type + '/with_results'
    apiPublicService().get(apiUrl, {
      params: searchParams
    }).then((response) => {
      commit('setLoadingStdSearch', { result: false })
      commit('setSearchFields', { result: response.data })
      // below in core store:
      commit('setSearchPageContent', { result: response.data })
      commit('setStdResultsObject', { results: response.data.results })
    }, (err) => {
      console.log(err)
    })
  },
  // TODO - replace below with above
  loadSearchPage: function({ commit }, searchParams) {
    // "full" below is the context - can also be "summary" for landing page
    let apiUrl = this.getters.baseApiUrlV3 + '/search/init/buy/full/with_results'
    apiPublicService().get(apiUrl, {
      params: searchParams
    }).then((response) => {
      commit('setSearchFields', { result: response.data })
      commit('setSearchPageContent', { result: response.data })
      commit('setSearchResults', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  }
}

// mutations
const mutations = {
  // loadResalesSearchIncPage can call some of these mutations with values
  // from local storage without making an api call
  setLoadingStdSearch: (state, { result }) => {
    state.loadingSearch = result
  },
  setStdResultsObject: (state, { results }) => {

    state.resultsObject = results
  },
  setSearchFields: (state, { result }) => {
    // aug 2018 - had previously used one set of states
    // for both buy and rent but this was causing
    // states to bleed between buy and rent pages
    let fieldsCollId = result.page.slug || "canned_search"
    state.searchFieldsColl[fieldsCollId] = result.search_fields
    // Had to initialise searchFieldsColl with vals for search_sales and
    // search_promotions for reactivity to work.
    // Previously tried:
    // https://stackoverflow.com/questions/40860592/vuex-getter-not-updating
    // Below not an option as Vue object is not available here
    // Vue.set(state.searchFieldsColl, result.page.slug, result.search_fields)

    // below used directly by search widget to populate options 
    // for dropdowns
    state.searchSelectOptions = result.search_select_options
  },
  setSearchResults: (state, { result }) => {
    state.propSearchResults = result.prop_search_results
    // state.noResultsMessage = result.no_results_message
    state.resultsMessage = result.results_message
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}