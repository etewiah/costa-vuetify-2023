import axios from 'axios'
import apiPublicService from "@jsroot/shared/services/api-public"
import { uniqBy } from 'lodash'

// initial state
const state = {
  propertyEnquiryErrors: [],
  propertyEnquirySuccess: "",
  propertyEnquirySending: false,
  callbackErrors: [],
  callbackSuccess: "",
  callbackSending: false,
  contactUsErrors: [],
  contactUsSuccess: "",
  contactUsSending: false,
  alertFormErrors: [],
  alertFormSuccess: "",
  alertFormSending: false,
  clientFormErrors: [],
  clientFormSuccess: "",
  clientFormSending: false
}

// getters
const getters = {}

// actions
const actions = {
  sendClientForm: function ({ commit }, clientFormParams) {
    // Mar 2020 - this was created initially for glenwood I think
    // Not used by bvh - need to revisit to see if I can
    // implement idea of a generic form that is build from serverside json..
    //
    // commit('setClientForm', { result: "reset" })
    // let apiUrl = this.getters.baseApiUrlV3 + '/forms/custom'
    // // let apiUrl = this.getters.baseApiUrl + clientFormParams.formUrlAppend
    // apiPublicService().post(apiUrl, {
    //   contact: clientFormParams.formData,
    //   config_id: clientFormParams.formConfigId,
    //   config_name: clientFormParams.formConfigName
    // }, {}).then(response => {
    //   commit('setClientForm', { result: response.data })
    // }, (err) => {
    //   let errResult = {
    //     errors: [err.message]
    //   }
    //   commit('setClientForm', { result: errResult })
    //   console.log(err)
    // })
  },
  sendCallbackRequest: function ({ commit }, callbackData) {
    commit('setCallback', { result: "reset" })
    let apiUrl = '/api_public/v3/forms/request_callback_zoho'
    apiPublicService().post(apiUrl, {
      contact: callbackData
    }, {}).then(response => {
      commit('setCallback', { result: response.data })
    }, (err) => {
      let errResult = {
        errors: [err.message]
      }
      commit('setCallback', { result: errResult })
      console.log(err)
    })
  },
  // below for notifications about a property
  sendAlertRequest: function ({ commit }, params) {
    commit('setAlertForm', { result: "reset" })
    let guuid = JSON.parse(localStorage.getItem('bvh:guu')) || ''
    let apiUrl = '/api_public/v3/forms/setup_alert_zoho'
    apiPublicService().post(apiUrl, {
      guuid: guuid,
      contact: params.contact,
      alertData: params.alertData
    }, {}).then(response => {
      commit('setAlertForm', { result: response.data })
      commit('setGuestUuid', { result: response.data })
    }, (err) => {
      let errResult = {
        errors: [err.message]
      }
      commit('setAlertForm', { result: errResult })
      console.log(err)
    })
  },
  // sendContactMessage: function({ commit }, enquiryData) {
  //   commit('setContactUs', { result: "reset" })
  //   let apiUrl = '/api_public/v3/forms/contact_us'
  //   // let apiUrl = this.getters.baseApiUrl + '/contact_us'
  //   apiPublicService().post(apiUrl, {
  //     contact: enquiryData
  //   }, {
  //   }).then(response => {
  //     commit('setContactUs', { result: response.data })
  //   }, (err) => {
  //     let errResult = {
  //       errors: [err.message]
  //     }
  //     commit('setContactUs', { result: errResult })
  //     console.log(err)
  //   })
  // },
  sendEnquiry: function ({ commit }, enquiryData) {
    commit('setPropertyEnquiry', { result: "reset" })
    let apiUrl = '/api_public/v3/forms/request_general_info'
    // Longer term the different forms will be configured from 
    // info stored on server. That config will include the 
    // api endpoint to post to..
    if (enquiryData.api_url) {
      apiUrl = enquiryData.api_url
    }
    apiPublicService().post(apiUrl, {
      alert_details: enquiryData.alert_details,
      contact: enquiryData.contact,
      listing: enquiryData.listing
    }, {}).then(response => {
      commit('setPropertyEnquiry', { result: response.data })
    }, (err, data) => {
      let errResult = {
        errors: [err.toString()]
      }
      commit('setPropertyEnquiry', { result: errResult })
      console.log(err)
    })
  },
}

// mutations
const mutations = {
  setCallback: (state, { result }) => {
    if (result === "reset") {
      state.callbackErrors = []
      state.callbackSuccess = ""
      state.callbackSending = true
      return
    }
    state.callbackSending = false
    if (result.success) {
      state.callbackSuccess = result.success_message
    } else {
      state.callbackErrors = result.error_messages || []
    }
  },
  setClientForm: (state, { result }) => {
    if (result === "reset") {
      state.clientFormErrors = []
      state.clientFormSuccess = ""
      state.clientFormSending = true
      return
    }
    state.clientFormSending = false
    if (result.success) {
      state.clientFormSuccess = result.success_message
    } else {
      state.clientFormErrors = result.error_messages || []
    }
  },
  setGuestUuid: (state, { result }) => {
    let resalesGuestKey = 'bvh:guu'
    localStorage.setItem(resalesGuestKey, JSON.stringify(result.guuid))
  },
  setAlertForm: (state, { result }) => {
    if (result === "reset") {
      state.alertFormErrors = []
      state.alertFormSuccess = ""
      state.alertFormSending = true
      return
    }
    state.alertFormSending = false
    if (result.success) {
      state.alertFormSuccess = result.success_message
    } else {
      state.alertFormErrors = result.error_messages || []
    }
  },
  setContactUs: (state, { result }) => {
    if (result === "reset") {
      state.contactUsErrors = []
      state.contactUsSuccess = ""
      state.contactUsSending = true
      return
    }
    state.contactUsSending = false
    if (result.success) {
      state.contactUsSuccess = result.success_message
    } else {
      state.contactUsErrors = result.errors || []
    }
  },
  setPropertyEnquiry: (state, { result }) => {
    if (result === "reset") {
      state.propertyEnquiryErrors = []
      state.propertyEnquirySuccess = ""
      state.propertyEnquirySending = true
      return
    }
    state.propertyEnquirySending = false
    if (result.success) {
      state.propertyEnquirySuccess = result.success_message
    } else {
      state.propertyEnquiryErrors = result.errors || []
    }
  },
  clearPropertyEnquiryStatus: (state, { }) => {
    state.propertyEnquiryErrors = []
    state.propertyEnquirySuccess = ""
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}