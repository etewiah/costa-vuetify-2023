// This calls server endpoint that passes through to wordpress
import apiPublicService from "@/services/api-public"

// initial state
const state = {
  singleBlogPage: {
    title: "",
    content: ""
  },
  blogPages: [],
  blogCategories: [],
  blogCollContainerPage: {},
  blogCollPageParts: {}
}

// getters
const getters = {
  getCatBlogPosts: (state) => (cats) => {
    let blogPages = []
    state.blogPages.forEach(function(page) {
      cats.forEach(function(cat) {
        if (page.categories.includes(cat.id)) {
          blogPages.push(page)
        }
      })
    })
    return blogPages
  },
}

// actions
const actions = {
  loadBlogPages: function({ commit }, preamble) {
    // gets list of pages 
    preamble = preamble || ""
    let apiUrl = this.getters.baseApiUrlV3 + '/blog_pages/list/' + preamble
    apiPublicService().get(apiUrl).then((response) => {
      commit('setBlogPagesData', { result: response.data })
      // commit('setLocaleUrls', { result: response.data.page.urls })
    }, (err) => {
      console.log(err)
    })
  },
  loadBlogPage: function({ commit }, pageName) {
    // in store, baseApiUrlV3 will change based on state.coreStore.currentLocale
    // so correct lang version will be reloaded
    let apiUrl = this.getters.baseApiUrlV3 + '/blog_pages/single/' + pageName
    apiPublicService().get(apiUrl).then((response) => {
      commit('setSingleBlogPage', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
}

// mutations
const mutations = {
  setSingleBlogPage: (state, { result }) => {
    let blog_post = result.blog_post || {
      title: "",
      content: ""
    }
    state.singleBlogPage = blog_post
  },
  setBlogPagesData: (state, { result }) => {
    // state.blogCollPageParts = result.page_parts
    state.blogCollContainerPage = result.page
    state.blogPages = result.blog_posts
    state.blogCategories = result.blog_categories
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}