import axios from 'axios'
import apiPublicService from "@/services/api-public"

// initial state
const state = {
  currentSearchAlert: {},
  visitorSearchAlerts: [],
  favsGuid: null,
  currentUser: {
    present: false,
    details: {}
  },
  currentUserIsAdmin: false,
  signInErrors: [],
  signInSending: false,
  userUpdateErrors: [],
  userUpdateSending: false,
  userUpdateSuccess: ""
}

// getters
const getters = {}

// actions
const actions = {
  createAlert: function ({ commit }, createAlertParams) {
    // let favsGuid = localStorage.getItem("favs:guid")
    let apiUrl = this.getters.baseApiUrlV3 + '/alerts'
    axios.post(apiUrl, {
      create_alert_params: createAlertParams
    }, {}).then(response => {
      // localStorage.setItem("favs:guid", response.data.favs_guid)
      commit('setGuestUuid', { result: response.data })
      commit('setSearchAlerts', { result: response.data })
    }, (err) => {
    })
  },
  retrieveSingleAlert: function ({ commit }, alertId) {
    let apiUrl = this.getters.baseApiUrlV3 + '/alerts/show/' + alertId
    axios.get(apiUrl, {
    }, {}).then(response => {
      commit('setSearchAlert', { result: response.data })
    }, (err) => {
    })
  },
  retrieveUserAlerts: function ({ commit }, guestId) {
    // could also retrieve guestId here
    // let guestId =
    // JSON.parse(localStorage.getItem(resalesFavsKey)) || []
    let apiUrl = this.getters.baseApiUrlV3 + '/alerts/list/' + guestId
    axios.get(apiUrl, {
      guestId: guestId
    }, {}).then(response => {
      commit('setSearchAlerts', { result: response.data })
    }, (err) => {
    })
  },
  updateFavourites: function ({ commit }, updateParams) {
    let favsGuid = localStorage.getItem("favs:guid")
    let apiUrl = this.getters.baseApiUrlV3 + '/favourites'
    axios.put(apiUrl, {
      todo: updateParams.action,
      propDetails: updateParams.propDetails,
      favsGuid: favsGuid
    }, {}).then(response => {
      localStorage.setItem("favs:guid", response.data.favs_guid)
    }, (err) => {
    })
  },
  updateCurrentUser: function ({ commit }, userData) {
    let apiUrl = '/users'
    commit('startSignIn')
    // console.log(axios)
    axios.put(apiUrl, {
      user: userData
    }, {}).then(response => {
      // location.reload()
      commit('setUserUpdateSuccess', { result: response.data })
    }, (err) => {
      // TODO - capture and display errors better
      // let errors = err.response.data.errors || {}
      // {current_password: Array(1)}
      let errMessage = err.response.data.errors || err.message
      let errResult = {
        errors: [errMessage]
      }
      commit('parseUserUpdateError', { result: errResult })
      console.log(err)
    })
  },
  signIn: function ({ commit }, userData) {
    let apiUrl = '/users/sign_in'
    commit('startSignIn')
    // console.log(axios)
    apiPublicService().post(apiUrl, {
      user: userData
    }, {}).then(response => {
      location.reload()
      // commit('setCurrentUser', { result: response.data })
    }, (err) => {
      let errMessage = err.response.data.error || err.message
      let errResult = {
        errors: [errMessage]
      }
      commit('parseSignInError', { result: errResult })
      console.log(err)
    })
  },
  signOut: function ({ commit }) {
    let apiUrl = '/en/users/sign_out'
    // console.log(axios)
    let authenticity_token = axios.defaults.headers.common["X-CSRF-Token"]
    // console.log(axios.defaults.headers.common["X-CSRF-Token"])
    apiPublicService().delete(apiUrl, {
      authenticity_token: authenticity_token
    }, {}).then(response => {
      location.reload()
      // commit('clearCurrentUser', { result: response.data })
    }, (err) => {
      // let errResult = {
      //   errors: [err.message]
      // }
      // commit('clearCurrentUser', { result: errResult })
      console.log(err)
    })
  },
  refreshCsrf: function ({ commit }) {
    let apiUrl = this.getters.baseApiUrlV3 + '/forms/refresh_csrf'
    apiPublicService().get(apiUrl).then((response) => {
      let token = response.headers["x-csrf-token"]
      console.log("csrf: " + token)
      axios.defaults.headers.common["X-CSRF-Token"] = token
    }, (err) => {
      console.log(err)
    })
  }

}

// mutations
const mutations = {
  setSearchAlert: (state, { result }) => {
    state.currentSearchAlert = result.alert
  },
  setSearchAlerts: (state, { result }) => {
    state.visitorSearchAlerts = result.alerts
  },
  startUserUpdate: (state) => {
    state.userUpdateErrors = []
    state.userUpdateSending = true
  },
  parseUserUpdateError: (state, { result }) => {
    state.userUpdateErrors = result.errors || []
    state.userUpdateSending = false
  },
  setUserUpdateSuccess: (state, { result }) => {
    state.userUpdateSuccess = "success"
    state.userUpdateSending = false
  },
  startSignIn: (state) => {
    state.signInErrors = []
    state.signInSending = true
  },
  parseSignInError: (state, { result }) => {
    state.signInErrors = result.errors || []
    state.signInSending = false
  },
  // below is called by main App.vue
  // which will pass in 
  // INMOAPP.currentUser
  setCurrentUser: (state, { result }) => {
    if (result && result.id) {
      state.currentUser.present = true
      state.currentUser.details = result
    }
  },
  // clearCurrentUser: (state, { result }) => {
  //   state.currentUser.present = false
  //   state.currentUser.details = {}
  //   // location.reload()
  // },
}

export default {
  state,
  getters,
  actions,
  mutations
}