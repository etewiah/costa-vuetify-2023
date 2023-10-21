// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })
import apiPublicService from "@/services/api-public"
import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import h2mStore from "@/store/h2m"
import listingsStore from "@/store/listings"
import coreStore from "@/store/core"
import blogsStore from "@/store/blogs"
import formsStore from "@/store/clientForms"
import userStore from "@/store/user"
import searchStore from "@/store/search"
import resalesStore from "@/store/resales"
import utilitiesStore from "@/store/utilities"
// import propertyFeaturesStore from "@jsroot/mgmt/store/property-features"

Vue.use(Vuex)

// let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
// // above available as I'm using rails layout
// axios.defaults.headers.common['X-CSRF-Token'] = token
// // axios.defaults.headers.common['Accept'] = 'application/json'
// // below needed for rails to recognise request.xhr?
// axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
// // without above X-CSRF-Token token would not get sent from rails
// // but when I set it, a preflight call to options is sent.....
// // axios.defaults.headers.common['X-CSRF-Token'] = token
// // axios.defaults.headers.common['Accept'] = 'application/json'
// dec 2018: setting headers etc in services such as apiPublicService
// which encapsulate axios.
// Also, using 'csrf-token' element in doc isn't such a great idea 
// as a lot of pages will be cached

const store = new Vuex.Store({
  modules: {
    utilitiesStore,
    listingsStore,
    h2mStore,
    coreStore,
    blogsStore,
    searchStore,
    formsStore,
    userStore,
    resalesStore
    // propertyFeaturesStore,
  },
  state: {
    // i18nMessages: {},
    // currentLocale: "en",
    // currentCurrency: "usd",
    displayCurrency: "CHF",
    // currentPage: {},
    // currentPageParts: {},
    // summaryProperties: {},
    // propSearchResults: [],
    // currentAgency: {},
    // currentSearchFieldsBuy: [],
    // currentSearchFields: [],
    // lastLoadedFromLS: false,
    localeUrls: null
  },
  actions: {
    // TODO - move this into a shared module as both admin
    // and non-admin stores use it
    callApiAsPromise: function ({ commit }, options) {
      return new Promise((resolve, reject) => {
        if (options.verb === "put") {
          apiPublicService().put(
            options.apiUrl,
            options.params).then((response) => {
              resolve(response)
            }, (err) => {
              console.log(err)
            })
        } else {
          apiPublicService().get(
            options.apiUrl,
            options.params).then((response) => {
              resolve(response)
            }, (err) => {
              console.log(err)
            })
        }
      })
    },
  },
  mutations: {
    setDisplayCurrency: (state, currency) => {
      state.displayCurrency = currency
    },
    // dec 2018 - TODO: move below to core store
    setLocaleUrls: (state, { result }) => {
      // below will be picked up by LangSwitcher component
      state.localeUrls = result
    }
  },
  getters: {
    // propApiSlug: state => {
    //   // allows me to to use same "property-features"
    //   // module for both h2m and glenwood
    //   // return "properties"
    //   return "prop_rentals"
    // },
    baseApiUrlV3: state => {
      return '/api_public/v3/' + state.coreStore.currentLocale
    },
    // baseApiUrl: state => {
    //   // console.log(process.env.API_URL_BASE)
    //   // return process.env.API_URL_BASE + '/api_public/v1/' + state.coreStore.currentLocale
    //   // Using above to call api from another domain causes issues with xsrf token
    //   // which I need to be able to submit forms via posts
    //   // Better to use config/index.js to proxy in dev and use proxy features
    //   // of netlify when deploying
    //   return '/api_public/v1/' + state.coreStore.currentLocale
    // }
  }
})
export default store