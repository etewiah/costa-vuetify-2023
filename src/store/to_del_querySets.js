// // jan 2019 - replaced by resales store for marbella
// // only h2m would use it if I activated that option
// import apiPublicService from "@jsroot/shared/services/api-public"

// // initial state
// const state = {
//   querySetResults: []
// }

// // getters
// const getters = {}

// // actions
// const actions = {
//   loadQueryResultsForPage: function({ commit }, pageName) {
//     let apiUrl = this.getters.baseApiUrlV3 + '/search/results_for_page/' + pageName
//     apiPublicService().get(apiUrl).then((response) => {
//       commit('setQuerySetResults', { result: response.data })
//     }, (err) => {
//     })
//   }
// }

// // mutations
// const mutations = {
//   setQuerySetResults: (state, { result }) => {
//     state.querySetResults = result
//   }
// }

// export default {
//   state,
//   getters,
//   actions,
//   mutations
// }