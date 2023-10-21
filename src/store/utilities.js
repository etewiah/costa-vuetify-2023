// Feb 2020 - was originally breadcrumbs but changing to serve as repo
// of handy functions.
// If this turns out to be overkill I might resort to
// https://stackoverflow.com/questions/35045119/how-can-i-share-a-method-between-components-in-vue-js
import apiPublicService from "@/services/api-public"
const state = {
  breadcrumbItems: [],
  // homeText: "Home"
}

// getters
const getters = {
  // breadcrumbItems: (state) => (pageName) => {
  //   return state.breadcrumbItems
  // },
}

// actions
const actions = {
  // callApiAsPromise: function ({ commit }, options) {
  //   return new Promise((resolve, reject) => {
  //     if (options.verb === "put") {
  //       apiPublicService().put(
  //         options.apiUrl,
  //         options.params).then((response) => {
  //           resolve(response)
  //         }, (err) => {
  //           console.log(err)
  //         })
  //     } else {
  //       apiPublicService().get(
  //         options.apiUrl,
  //         options.params).then((response) => {
  //           resolve(response)
  //         }, (err) => {
  //           console.log(err)
  //         })
  //     }
  //   })
  // },
  searchFromParamsResalesAsPromise: function ({ commit }, incomingSearchParams) {
    let searchParams = this.getters.getApiRouteFromQueryParams(incomingSearchParams)
    let apiUrl = this.getters.baseApiUrlV3 + '/search_cc_resales/results_from_params'
    apiUrl = apiUrl + "/op/" + (searchParams.op || "err")
    // if (searchParams.city) {
    //   // url with city as a param will not be page_cached
    //   // serverside as the urls can be too long
    //   apiUrl = apiUrl + "/city/" + (searchParams.city || "err")
    // }
    // passing in err (val should have been 'ignore') means that
    // param is ignored rather than default which uses a server
    // determined default value
    apiUrl = apiUrl + "/features/" + (searchParams.features || "err")
    apiUrl = apiUrl + "/bedrooms_min/" + (searchParams.bedrooms_min || "err").toString().split(".")[0]
    apiUrl = apiUrl + "/bedrooms_max/" + (searchParams.bedrooms_max || "err").toString().split(".")[0]
    apiUrl = apiUrl + "/bathrooms_min/" + (searchParams.bathrooms_min || "err").toString().split(".")[0]
    apiUrl = apiUrl + "/bathrooms_max/" + (searchParams.bathrooms_max || "err").toString().split(".")[0]
    // apiUrl = apiUrl + "/bedrooms_min/" + (searchParams.bedrooms_min || "err")
    // apiUrl = apiUrl + "/bathrooms_min/" + (searchParams.bathrooms_min || "err")
    apiUrl = apiUrl + "/price_min/" + (searchParams.price_min || "default")
    apiUrl = apiUrl + "/price_max/" + (searchParams.price_max || "err")
    apiUrl = apiUrl + "/type/" + (searchParams.type || "err")
    apiUrl = apiUrl + "/sort/" + (searchParams.sort || "3")
    // should probably be more explicit that below is "page_no"
    apiUrl = apiUrl + "/page/" + (searchParams.page || "1")
    apiUrl = apiUrl + "/cs/" + (searchParams.cannedSearchUuid || "ign")
    // url above is page cacheable
    // search param vals need to be explicitly passed here which is why I pass
    // "err" if they are not

    return new Promise((resolve, reject) => {
      apiPublicService().get(
        apiUrl).then((response) => {
          resolve(response)
        }, (err) => {
          console.log(err)
        })
    })
    // let searchNamespace = "pwb-last-search:"
    // let savedResults = JSON.parse(localStorage.getItem(searchNamespace + apiUrl)) || null

    // if (savedResults) {
    //   commit('setResalesSearchResultsObject', { result: savedResults.results })
    // } else {
    //   // commit('setLoadingSearch', { result: true })
    //   setTimeout(() => {
    //     commit('setLoadingSearch', { result: true })
    //   }, 500);
    //   apiPublicService().get(apiUrl, {
    //     // params: searchParams
    //   }).then((response) => {
    //     commit('setCachedSearch', { key: (searchNamespace + apiUrl), responseData: JSON.stringify(response.data) })

    //     commit('setLoadingSearch', { result: false })
    //     commit('setResalesSearchResultsObject', { result: response.data.results })
    //     // below mutations in search store:
    //     // commit('setSearchResults', { result: response.data })
    //   }, (err) => {
    //     console.log(err)
    //   })
    // }
  },
}

// mutations
const mutations = {
  // setCrumbsHomeText: (state, { result }) => {
  //   state.homeText = result.translations["client_shared"]["core"]["home"]
  // },
  // Oct 2019 TODO - breadcrumbs should be retrieved via
  // a getter which concats home link with extraCrumbs
  // Right now homeText does not update when lang is changes
  setPropCrumbs: (state, { extraCrumbs, locale }) => {
    // let homeTxt = this.getters.getFastI18nS("core.home") || "Home"
    // not able to access this.getters
    let homeTxt = "Home"
    if (INMOAPP.clientSettings.translations) {
      homeTxt = INMOAPP.clientSettings.translations.client_shared.core.home
    }
    locale = locale || "en"
    let breadcrumbItems = [{
      text: homeTxt,
      disabled: false,
      exact: true,
      // href: homeHref
      // below only works if exact is set to true..
      to: {
        name: 'landing',
        params: {
          locale: locale
        }
      }
    }]
    state.breadcrumbItems = breadcrumbItems.concat(extraCrumbs)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}