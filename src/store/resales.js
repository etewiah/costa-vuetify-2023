// import axios from 'axios'
import apiPublicService from "@/services/api-public"

// initial state
const state = {
  querySetResults: {},
  currentProperty: {},
  autoDesc: "",
  autoTitle: "",
  currentPropertyPage: {},
  resultsObject: {},
  loadingSearch: false
}

// getters
const getters = {
  getApiRouteFromQueryParams: (state) => (queryParams) => {
    let priceRangeParams = queryParams["price"] ? queryParams["price"].split("-") : []
    if (priceRangeParams && (priceRangeParams.length === 2)) {
      queryParams["price_min"] = priceRangeParams[0]
      queryParams["price_max"] = priceRangeParams[1]
    }
    // Nov 2019 - not convinced above is still used

    // May 2019 - currently just parses queryParams
    // for price val but later should have the full cachable 
    // url returned from here
    return queryParams
  },
  getSimilarPropertiesQueryParams: (state) => (listingModel) => {
    // May 2019
    // perhaps I should do some checks on the values here to prevent
    // any values with a period that will break 
    // the search url
    let params = {
      sort: "3",
    }
    params.city = listingModel.Location || "default"
    // for type below, parsing it would involve too much 
    // messing about to get correct codes - might return to it later..
    params.type = "default"
    params.bedrooms = listingModel.Bedrooms || "default"
    params.bathrooms = listingModel.Bathrooms || "default"
    params.price = listingModel.Price || "default"
    return params
  },
  getResalesSummListingsFeatured: (state) => {
    // summary listings for home page
    return state.querySetResults.resales_featured || {}
  },
  getResalesSummListingsForSale: (state) => {
    // below disabled
    return state.querySetResults.resales_for_sale || {}
    // by setting "promoted_props = []" here:
    // /controllers/api_public/v3/resales_controller.rb
  },
  getResalesSummListingsPromotions: (state) => {
    return state.querySetResults.promotions || {}
  },
  getResalesSearchListings: (state) => {
    return state.resultsObject.listings
  },
  getResalesResultsTitle: (state) => {
    return state.resultsObject.results_title
  },
  getResalesResultsText: (state) => {
    return state.resultsObject.results_text
  },
  getResalesResultsSuffix: (state) => {
    return state.resultsObject.results_suffix || ""
  },
  getResalesQueryInfo: (state) => {
    return state.resultsObject.query_info
  }
}

// actions
const actions = {
  loadResaleDetails: function ({ commit }, params) {
    let apiUrl = this.getters.baseApiUrlV3 + `/resales/${params.salesOrRentals}/${params.propertyId}`
    apiPublicService().get(apiUrl).then((response) => {
      if (response.data) {
        commit('setCurrentResalesProperty', { result: response.data.property })
        commit('setAutoDesc', { result: response.data.auto_desc })
        commit('setAutoTitle', { result: response.data.auto_title })
        // commit('setCurrentPropertyPage', { result: response.data })
      } else {
        commit('set404', { is404: true, is404Listing: true })
      }
    }, (err) => {
      commit('set404', { is404: true, is404Listing: true })
      // if (err.response.status === 404) {
      //   commit('set404', { is404: true, is404Listing: true })
      // } else {
      //   commit('setPropertyRetrievalError', { err: err })
      // }
    })
  },
  // TODO mar 2019
  // move below into search store
  // Called when updating a search
  searchFromParamsResales: function ({ commit }, incomingSearchParams) {
    let searchParams = this.getters.getApiRouteFromQueryParams(incomingSearchParams)
    // previously updateResalesSearch
    // Key diff from other search method is that it does not include config info about
    // page initiating the search

    let apiUrl = this.getters.baseApiUrlV3 + '/search_cc_resales/results_from_params'
    apiUrl = apiUrl + "/op/" + (searchParams.op || "err")
    if (searchParams.city) {
      // url with city as a param will not be page_cached
      // serverside as the urls can be too long
      apiUrl = apiUrl + "/city/" + (searchParams.city || "err")
    }
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
    // search param vals need to be explicitly passed where with is why I pass
    // "err" if they are not

    let searchNamespace = "pwb-last-search:"
    let savedResults = JSON.parse(localStorage.getItem(searchNamespace + apiUrl)) || null

    if (savedResults) {
      commit('setResalesSearchResultsObject', { result: savedResults.results })
    } else {
      // commit('setLoadingSearch', { result: true })
      setTimeout(() => {
        commit('setLoadingSearch', { result: true })
      }, 500);
      apiPublicService().get(apiUrl, {
        // params: searchParams
      }).then((response) => {
        commit('setCachedSearch', { key: (searchNamespace + apiUrl), responseData: JSON.stringify(response.data) })

        commit('setLoadingSearch', { result: false })
        commit('setResalesSearchResultsObject', { result: response.data.results })
        // below mutations in search store:
        // commit('setSearchResults', { result: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  //         # Feb 2020 todo - deprecating below:
  // loadCannedSearch: function ({ commit }, cannedSearchKey) {
  //   let cannedSearchType = "resales_city"
  //   let apiUrl = this.getters.baseApiUrlV3 + '/canned/' + cannedSearchType + '/' + cannedSearchKey
  //   apiPublicService().get(apiUrl).then((response) => {
  //     commit('setResalesSearchResultsObject', { result: response.data.results })
  //     // below mutations in search store:
  //     commit('setSearchFields', { result: response.data })
  //     commit('setSearchPageContent', { result: response.data })
  //   }, (err) => { })
  // },
  // below is the initial search which returns info about fields etc...
  loadResalesSearchIncPage: function ({ commit }, incomingSearchParams) {
    let searchParams = this.getters.getApiRouteFromQueryParams(incomingSearchParams)
    // Includes info about page initiating the search...
    let apiUrl = this.getters.baseApiUrlV3 + '/search_cc_resales/init/with_results'
    apiUrl = apiUrl + "/op/" + (searchParams.op || "default")
    if (searchParams.city_search_key) {
      apiUrl = apiUrl + "/city_search_key/" + (searchParams.city_search_key || "default")
    } else if (searchParams.city) {
      // url with city as a param will not be page_cached
      // serverside as the urls can be too long
      apiUrl = apiUrl + "/city/" + (searchParams.city || "default")
    }
    apiUrl = apiUrl + "/features/" + (searchParams.features || "default")
    apiUrl = apiUrl + "/bedrooms_min/" + (searchParams.bedrooms_min || "default")
    apiUrl = apiUrl + "/bedrooms_max/" + (searchParams.bedrooms_max || "default")
    apiUrl = apiUrl + "/bathrooms_min/" + (searchParams.bathrooms_min || "default")
    apiUrl = apiUrl + "/bathrooms_max/" + (searchParams.bathrooms_max || "default")
    apiUrl = apiUrl + "/price_min/" + (searchParams.price_min || "default")
    apiUrl = apiUrl + "/price_max/" + (searchParams.price_max || "default")
    // should probably be more explicit that below is "prop_type"
    apiUrl = apiUrl + "/type/" + (searchParams.type || "default")
    apiUrl = apiUrl + "/sort/" + (searchParams.sort || "3")

    apiUrl = apiUrl + "/page/" + (searchParams.page || "1")
    // url above is page cacheable

    let searchNamespace = "pwb-last-search:"
    let savedResults = JSON.parse(localStorage.getItem(searchNamespace + apiUrl)) || null

    if (savedResults) {
      commit('setResalesSearchResultsObject', { result: savedResults.results })
      // below mutations in search store:
      commit('setSearchFields', { result: savedResults })
      commit('setSearchPageContent', { result: savedResults })

    } else {
      commit('setLoadingSearch', { result: true })
      apiPublicService().get(apiUrl, {
        // params: searchParams
      }).then((response) => {
        // localStorage.setItem((searchNamespace + apiUrl), JSON.stringify(response.data))
        commit('setCachedSearch', { key: (searchNamespace + apiUrl), responseData: JSON.stringify(response.data) })

        commit('setLoadingSearch', { result: false })
        commit('setResalesSearchResultsObject', { result: response.data.results })
        // below mutations in search store:
        commit('setSearchFields', { result: response.data })
        commit('setSearchPageContent', { result: response.data })
        // commit('setSearchResults', { result: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  searchFuzzyFromParamsResales: function ({ commit }, searchParams) {
    // for finding similar properties
    commit('setLoadingSearch', { result: true })
    let apiUrl = this.getters.baseApiUrlV3 + '/search_cc_resales/results_from_params_fuzzy'
    apiUrl = apiUrl + "/op/" + (searchParams.op || "default")
    apiUrl = apiUrl + "/city/" + (searchParams.city || "default")
    apiUrl = apiUrl + "/bedrooms/" + (searchParams.bedrooms || "default").toString().split(".")[0]
    apiUrl = apiUrl + "/bathrooms/" + (searchParams.bathrooms || "default").toString().split(".")[0]
    // .split(".")[0] is to avoid sending values with periods which
    // will break rails routes
    apiUrl = apiUrl + "/price/" + (searchParams.price || "default")
    apiUrl = apiUrl + "/type/" + (searchParams.type || "default")
    apiUrl = apiUrl + "/sort/" + (searchParams.sort || "3")
    // should probably be more explicit that below is "page_no"
    apiUrl = apiUrl + "/page/" + (searchParams.page || "1")

    apiPublicService().get(apiUrl, {
      // params: searchParams
    }).then((response) => {
      commit('setLoadingSearch', { result: false })
      commit('setResalesSearchResultsObject', { result: response.data.results })
      // below mutations in search store:
      // commit('setSearchResults', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  // below called by homepage to show featured properties
  loadResalesQueryResults: function ({ commit }, pageName) {
    let apiUrl = this.getters.baseApiUrlV3 + '/resales/results_for_page/' + pageName
    apiPublicService().get(apiUrl).then((response) => {
      commit('setQuerySetResults', { result: response.data })
    }, (err) => { })
  }
}

// mutations
const mutations = {
  setCachedSearch: (state, { key, responseData }) => {
    // clear out previous search caches:
    let i = localStorage.length,
      checkKey
    while (i--) {
      checkKey = localStorage.key(i)
      if (checkKey.slice(0, 15) === "pwb-last-search") {
        localStorage.removeItem(checkKey)
      }
    }
    localStorage.setItem(key, responseData)
  },
  setLoadingSearch: (state, { result }) => {
    state.loadingSearch = result
  },
  setCurrentResalesProperty: (state, { result }) => {
    state.currentProperty = result
  },
  setAutoDesc: (state, { result }) => {
    state.autoDesc = result.description || ""
  },
  setAutoTitle: (state, { result }) => {
    state.autoTitle = result
  },
  setQuerySetResults: (state, { result }) => {
    state.querySetResults = result.results
  },
  setResalesSearchResultsObject: (state, { result }) => {
    state.resultsObject = result
    // state.propSearchResults = result.prop_search_results
    // state.resultsMessage = result.results_message
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}