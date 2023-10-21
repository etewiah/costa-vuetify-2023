<template>
  <v-card class="mb-5 px-4 py-3" text color="#FAFAFA">
    <span>
      <!--       {{$ft("client_shared.labels.contactUs") }}
 --> </span>
    <!-- above gets bg col set by vuetify -->
    <v-form v-model="formValid" ref="enqForm" lazy-validation @submit.prevent="onSubmitEnquiry">
      <div v-for="(field) in propertyEnquiryShortFields" :key="field.fieldName" class="pt-0 pb-0">
        <v-text-field class="property-contact" solo :required="field.required" :rules="field.validationRules" name="" :label="$ft(field.labelTextTKey)" v-model="enquiryContent.contact[field.fieldName]"></v-text-field>
      </div>
      <v-select class="property-contact" solo :items="$store.getters.prefLangs" :label="$ft('client_shared.forms.prefLang')" v-model="enquiryContent.contact['pref_lang']" required></v-select>
      <v-textarea rows="17" class="property-contact" solo :required="messageField.required" :rules="messageField.validationRules" name="" :label="$ft(messageField.labelTextTKey)" v-model="enquiryContent.contact[messageField.fieldName]"></v-textarea>
      <v-checkbox class="mt-0" :required="true" label="" v-model="tandcAccepted">
        <span slot="label">{{ $ft('client_shared.gdpr.tAndCAcceptance') }}
          <router-link class="maincolor" :to="$store.getters.privacyTandCPage">{{$ft("client_shared.gdpr.tAndC") }}</router-link>. </span>
      </v-checkbox>
      <p v-if="propertyEnquiryErrors.length">
        <template v-for="(error,index) in propertyEnquiryErrors">
          <v-alert :key="index" outlined color="error" icon="warning" :value="true">
            {{error}}
          </v-alert>
        </template>
      </p>
      <p v-if="propertyEnquirySuccess.length">
        <v-alert outlined color="success" dismissible v-model="successModel">
          {{ propertyEnquirySuccess }}
        </v-alert>
      </p>
      <v-flex xs12 sm12 offset-sm0>
        <template v-if="propertyEnquirySending">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </template>
      </v-flex>
      <v-btn block height="64" type="submit" color="#F7A100" dark>
        {{ $ft("client_shared.forms.submit") }}
      </v-btn>
    </v-form>
  </v-card>
</template>
<script>
export default {
  components: {},
  props: [],
  // beforeUpdate() {
  //   this.$store.commit('clearPropertyEnquiryStatus', {})
  // },
  beforeDestroy() {
    this.$store.commit('clearPropertyEnquiryStatus', {})
  },
  data() {
    return {
      checkboxErrors: "",
      promptTandC: false,
      tandcAccepted: true,
      successModel: true,
      // above only needed so success alert can be dismissed
      formValid: false,
      messageField: {
        labelTextTKey: "client_shared.core.message",
        multiLine: true,
        fieldName: "message",
        inputType: "text",
        required: true,
        validationRules: [
          v => !!v || 'Message is required',
        ]
      },
      propertyEnquiryShortFields: [{
        labelTextTKey: "client_shared.core.name",
        fieldName: "name",
        inputType: "text",
        validationRules: [
          v => !!v || 'Name is required',
        ]
      }, {
        labelTextTKey: "client_shared.core.email",
        fieldName: "email",
        inputType: "text",
        required: true,
        validationRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }, {
        labelTextTKey: "client_shared.core.tel",
        fieldName: "tel",
        inputType: "text",
        validationRules: []
      }],
      enquiryContent: {
        contact: {
          ask_type: "",
          name: "",
          message: ""
        },
        listing: {},
        alertAgreed: false,
        alert_details: {}
      }
    }
  },
  computed: {
    // tAndcLink() {
    //   return {
    //     route: {
    //       name: 'standardPageDetails',
    //       query: {},
    //       params: {
    //         locale: this.$store.state.coreStore.currentLocale,
    //         pageName: 'legal-notice'
    //       }
    //     }
    //   }
    // },
    propertyEnquirySending() {
      return this.$store.state.formsStore.propertyEnquirySending
    },
    propertyEnquirySuccess() {
      return this.$store.state.formsStore.propertyEnquirySuccess
    },
    propertyEnquiryErrors() {
      return this.$store.state.formsStore.propertyEnquiryErrors
    },
  },
  watch: {
    'tandcAccepted'(newValue, oldValue) {
      if (newValue === true) {
        this.promptTandC = false
      }
    }
  },
  methods: {
    onSubmitEnquiry() {
      // if (!this.tandcAccepted) {
      //   this.promptTandC = true
      //   return
      // }

      this.formValid = this.$refs.enqForm.validate()
      // in case nothing has been typed in, above will display error messages
      // dec 2018 - previously just called validate() in function below 
      // (like in ContactUsForm) but it seems that somehow formValid gets 
      // set to true when an invalid submit is made
      if (!this.formValid) {
        return
      }

      this.enquiryContent.api_url = "/api_public/v3/forms/request_general_info_zoho"
      this.$store.dispatch('sendEnquiry', this.enquiryContent)
      // TODO: ensure above is successfull before calling below:
      // this.pendingChanges = {}
      // this.hasPendingChanges = false
    }

  }
}
</script>
<style>
/** Contact Right Sidebar **/
.property-contact .v-input__slot {
  background-color: white !important;
  border: 1px solid #d2d2d2 !important;
  box-shadow: none !important;
}
</style>