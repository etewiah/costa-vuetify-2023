/* eslint-disable no-undef */
// June 2019 - might take out the page
// functionality and move to a dedicated store
import apiPublicService from "@/services/api-public"
const state = {
  preRenderedFrag: null,
  showBelowFold: false,
  currentPageSlots: [],
  currentPage: {
    areaDetails: {}
  },
  pageError: {},
  currentPageSearchFields: [],
  // summaryProperties: {},
  pageListings: {},
  currentClientForms: [],
  pageSearchSelectOptions: {},

  i18nMessages: {},
  currentLocale: "en",
  // the default locale gets set in a beforeCreate event
  // in App.vue
  // currentCurrency: "usd",
  displayCurrency: "EUR",
  clientSettings: {
    navigation: {},
    preambles: {}
  },
  displaySettings: {},
  currentAgency: {},

  errorSnackbar: {
    snackbar: false,
    color: 'red',
    mode: '',
    timeout: 0,
    // text: 'Hello, I\'m a snackbar'
  },
  is404: false,
  is404Listing: false,
  // to allow showing a progress bar:
  isRouteLoading: false,
  baseCssClass: ""
  // isCookieAccepted: false
}

const getters = {
  allViewSlotsForLocale: (state, getters) => (activeLocale) => {
    // let currentPageDetails = state.currentPage.details || {}
    // let slots = currentPageDetails.slots || {}
    // return slots[activeLocale] || {}
    // October 2019:
    return state.currentPage.current_locale_slots || {}
  },

  // TODO rename below to listingPreambleResales
  listingPreamble: (state) => {
    // let listingPreamble = "propiedades"
    // if (state.currentLocale === "en") {
    //   listingPreamble = "properties"
    // }
    // return listingPreamble
    return INMOAPP.clientSettings.preambles.sale || ""
  },
  listingPreamblePromotion: (state) => {
    return INMOAPP.clientSettings.preambles.promotion || ""
  },
  standardPage: (state) => (pageName) => {
    return {
      name: 'standardPageDetails',
      params: { pageName: pageName, locale: state.currentLocale }
    }
  },
  // getFastI18nS: (state) => (key) => {
  //   const deep_value = (obj, path) =>
  //     path
  //       .replace(/\[|\]\.?/g, '.')
  //       .split('.')
  //       .filter(s => s)
  //       .reduce((acc, val) => acc && acc[val], obj)
  //   if (INMOAPP.clientSettings.translations.client_shared) {
  //     return deep_value(INMOAPP.clientSettings.translations.client_shared, key) || " "
  //     // return state.i18nMessages["client_shared"]["core.english"]
  //   } else {
  //     return ""
  //   }
  // },
  // getI18nS: (state) => (key) => {
  //   const deep_value = (obj, path) =>
  //     path
  //       .replace(/\[|\]\.?/g, '.')
  //       .split('.')
  //       .filter(s => s)
  //       .reduce((acc, val) => acc && acc[val], obj)
  //   if (state.i18nMessages["client_shared"]) {
  //     return deep_value(state.i18nMessages["client_shared"], key) || " "
  //     // return state.i18nMessages["client_shared"]["core.english"]
  //   } else {
  //     return ""
  //   }
  // },
  prefLangs: (state) => {
    if (state.i18nMessages["client_shared"]) {
      return [
        // TODO - use short code for lang as key so I can use route locale
        // to retrieve like so: state.i18nMessages["client_shared"]["core"]["en"]
        state.i18nMessages["client_shared"]["core"]["english"],
        state.i18nMessages["client_shared"]["core"]["spanish"],
        // state.i18nMessages["client_shared"]["core"]["italian"],
        state.i18nMessages["client_shared"]["core"]["dutch"]
        // state.i18nMessages["client_shared"]["core"]["french"]
      ]
    } else {
      return []
    }
    // return [
    //   this.$i18n.t("client_shared.core.english"),
    // ]
  },
  favouritesPage: (state) => {
    // let pageName = "privacy"
    return {
      name: 'favouritesIndexPage',
      params: { locale: state.currentLocale }
    }
  },
  privacyTandCPage: (state) => {
    let pageName = "privacy"
    return {
      name: 'standardPageDetails',
      params: { pageName: pageName, locale: state.currentLocale }
    }
  },
  legalNoticePage: (state) => {
    let pageName = "legal-notice"
    return {
      name: 'standardPageDetails',
      params: { pageName: pageName, locale: state.currentLocale }
    }
  },
  contactUsPage: (state) => {
    let contactUsPageName = "contactar"
    if (state.currentLocale === "en") {
      contactUsPageName = "contact-us"
    }
    return {
      name: 'standardPageDetails',
      params: { pageName: contactUsPageName, locale: state.currentLocale }
    }
  },
  aboutPage: (state) => {
    let aboutPageName = "sobre-nosotros"
    if (state.currentLocale === "en") {
      aboutPageName = "about-us"
    }
    return {
      name: 'standardPageDetails',
      params: { pageName: aboutPageName, locale: state.currentLocale }
    }
  },
  aboutPageUrl: (state) => {
    let aboutPageName = "sobre-nosotros"
    if (state.currentLocale === "en") {
      aboutPageName = "about-us"
    }
    return `/${state.currentLocale}/p/${aboutPageName}` // About Us
  },
  // cookieStatus: state => {
  //   return localStorage.getItem('cookie:accepted') || false
  // }
  getTopNavLinks: (state, getters) => (id) => {
    // TODO - get rid of id param
    return INMOAPP.clientSettings.navigation.top_nav || []
  },
  getFooterNavLinks: (state) => {
    return INMOAPP.clientSettings.navigation.footer || []
  }
  // parameterized getter
  // getMovieById: (state, getters) => (id) => {
  //   counter++
  //   return state.movies.find(movie => movie.id === id)
  // }
}


// actions
const actions = {
  loadAreaPage: function ({ commit }, params) {
    // areaSlug = params.areaSlug || "malaga"
    let apiUrl = this.getters.baseApiUrlV3 + '/pages_for_areas/' + params.areaType + '/' + params.areaSlug
    apiPublicService().get(apiUrl, {}).then((response) => {
      if (response) {
        commit('setPageContent', { result: response.data })
        commit('setLocaleUrls', { result: response.data.page.urls })
      }

    }, (err) => { })
  },
  loadStdPage: function ({ commit }, pageName) {
    let apiUrl = this.getters.baseApiUrlV3 + '/pages/' + pageName
    apiPublicService().get(apiUrl, {}).then((response) => {
      commit('setPageContent', { result: response.data })
      commit('setLocaleUrls', { result: response.data.page.urls })
    }, (err) => { })
  },
  // loadStandardPage: function({ commit }, pageParams) {
  //   let apiUrl = this.getters.baseApiUrlV3 + '/pages/' + pageParams.slug

  //   apiPublicService().get(apiUrl, {
  //     params: {
  //       props_filters: pageParams.props_filter
  //     }
  //   }).then((response) => {
  //     commit('setPageContent', { result: response.data })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // },
  loadSettings: function ({ commit }) {
    // TODO oct 2019 - check for translations on INMOAPP
    // object before making axios call below
    // (Though all of this could become redundant with kimaru 
    // prerendering)
    let apiUrl = this.getters.baseApiUrlV3 + '/client_settings'
    apiPublicService().get(apiUrl).then((response) => {
      // commit('setCrumbsHomeText', { result: response.data })
      commit('setClientSettings', { result: response.data })
    }, (err) => {
      console.log(err)
    })
  }
}

// mutations
const mutations = {
  setPreRenderedFrag(state, { preRenderedFrag }) {
    state.preRenderedFrag = preRenderedFrag
    // body...
  },
  enableBelowFold(state) {
    state.showBelowFold = true
  },
  acceptCookieLaw(state) {
    state.isCookieAccepted = true
  },
  // setCookieStatus (state) {
  //   state.isCookieAccepted = localStorage.getItem('cookie:accepted') || false
  // },
  setCurrentLocale: (state, locale) => {
    state.currentLocale = locale
  },
  setClientSettings: (state, { result }) => {
    state.clientSettings = result
    // TODO - use getters to retrieve different values below from clientSettings
    state.displaySettings = result.display_settings
    // state.agencyMapMarker = result.agency_map_marker
    // state.pageSearchSelectOptions = result.search_select_options
    state.currentAgency = result.current_agency
    // TODO - might need to change key used for below on server
    // and also use localStorage to cache client settings
    // state.displayCurrency = result.display_settings.default_currency
    // june 2018:
    // Instead of trying to import i18n here,
    // decided to observe i18nMessages in root App instead
    state.i18nMessages = result.translations
    // app.$i18n.messages.es = result.translations
    // let locale = state.currentLocale
    // app.$i18n.setLocaleUrls(locale, result.translations)
    // app.$i18n.locale = locale
    // don't like below but seems like only workaround $i18n not
    // being available in store
    // if (this && this.state.utilitiesStore) {
    //   this.state.utilitiesStore.homeText = state.i18nMessages["client_shared"]["core"]["dutch"]      
    // }
    // commit('setCrumbsHomeText', { text: state.i18nMessages["client_shared"]["core"] })
  },
  setBaseCss: (state, { className }) => {
    state.baseCssClass = className
  },
  set404: (state, { is404, is404Listing }) => {
    state.is404 = is404
    state.is404Listing = is404Listing || false
  },
  setRouteLoading: (state, { isRouteLoading }) => {
    state.isRouteLoading = isRouteLoading
  },
  setPageContent: (state, { result }) => {
    state.currentPageSlots = result.config_for_view_slots || []
    // this is sometimes called with empty results when navigating 
    // away from a route so need " || " to not have undefined results
    state.currentPage = result.page || {}
    state.pageListings = result.page_listings || {}
    // state.summaryProperties = result.properties
    // nov 2019 - not using summaryProperties anymore
    state.currentClientForms = result.client_forms
    state.currentPageSearchFields = result.search_fields
    // below could perhaps be set once for the whole site
    // its just dropdown options (could also try to be smart
    // and get them on dropdown click...)
    state.pageSearchSelectOptions = result.search_select_options
    if (result.area_details) {
      state.currentPage.areaDetails = result.area_details
    }
  },
  setPageError: (state, { errorObject }) => {
    state.pageError = errorObject
  },
  // nov 2019 - added above
  // below sets snackbar automatically whereas above has to 
  // be observed by individual page
  setAppWideError: (state, { errorObject }) => {
    state.errorSnackbar = errorObject
  },
  setAppWideSuccess: (state, { successMessage }) => {
    successMessage = successMessage || "Success"
    var successObject = {
      snackbar: true,
      text: successMessage,
      top: true,
      color: 'green',
      timeout: 9000
    }
    state.errorSnackbar = successObject
  },
  // // below called by search store
  setSearchPageContent: (state, { result }) => {
    state.currentPage = result.page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}