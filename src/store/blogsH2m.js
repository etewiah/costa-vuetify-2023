// import axios from 'axios'
import apiPublicService from "@jsroot/shared/services/api-public"

// initial state
const state = {
  blogPages: [],
  blogCollContainerPage: {},
  blogCollPageParts: {}
}

// getters
const getters = {}

// actions
const actions = {
  //May 2018: currently only used by malaga theme
  loadBlogPages: function({ commit }, preamble) {
    // gets list of pages 
    preamble = preamble || ""
    let apiUrl = this.getters.baseApiUrlV3 + '/blog_pages/list/' + preamble
    apiPublicService().get(apiUrl).then((response) => {
      commit('setBlogPagesData', { result: response.data })
      commit('setLocaleUrls', { result: response.data.page.urls })
    }, (err) => {
      console.log(err)
    })
  },
  //May 2018: currently only used by malaga theme
  loadBlogPage: function({ commit }, pageName) {
    // in store, baseApiUrlV3 will change based on state.coreStore.currentLocale
    // so correct lang version will be reloaded
    let apiUrl = this.getters.baseApiUrlV3 + '/blog_pages/single/' + pageName
    apiPublicService().get(apiUrl).then((response) => {
      commit('setPageContent', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
}

// mutations
const mutations = {
  setBlogPagesData: (state, { result }) => {
    state.blogCollPageParts = result.page_parts
    state.blogCollContainerPage = result.page
    state.blogPages = result.pages
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}