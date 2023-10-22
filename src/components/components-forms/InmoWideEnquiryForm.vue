<template>
  <v-card class="mb-0 px-5 py-0">
    <v-form
      v-model="formValid"
      ref="enqForm"
      lazy-validation
      @submit.prevent="onSubmitEnquiry"
    >
      <v-layout row wrap>
        <v-flex sm6 xs12>
          <v-select
            class="property-contact"
            solo
            :items="askTypes"
            :label="$ft('client_shared.forms.reqInfo')"
            v-model="enquiryContent.contact['ask_type']"
            required
          ></v-select>
          <v-select
            class="property-contact"
            solo
            :items="$store.getters.prefLangs"
            :label="$ft('client_shared.forms.prefLang')"
            v-model="enquiryContent.contact['pref_lang']"
            required
          ></v-select>
          <v-textarea
            rows="17"
            class="property-contact"
            solo
            :required="messageField.required"
            :rules="messageField.validationRules"
            name=""
            :label="$ft(messageField.labelTextTKey)"
            v-model="enquiryContent.contact[messageField.fieldName]"
          ></v-textarea>
        </v-flex>
        <v-flex sm6 xs12>
          <div
            v-for="field in propertyEnquiryShortFields"
            :key="field.fieldName"
            class="pt-0 pb-0"
          >
            <v-text-field
              class="property-contact"
              solo
              :required="field.required"
              :rules="field.validationRules"
              name=""
              :label="$ft(field.labelTextTKey)"
              v-model="enquiryContent.contact[field.fieldName]"
            ></v-text-field>
          </div>
          <v-checkbox
            v-if="!hideAlertPrompt"
            :label="$ft('client_shared.forms.receiveSimilarProps')"
            v-model="enquiryContent['alertAgreed']"
          ></v-checkbox>
          <v-checkbox
            class="mt-0"
            :required="true"
            label=""
            v-model="tandcAccepted"
          >
            <span slot="label"
              >{{ $ft('client_shared.gdpr.tAndCAcceptance') }}
              <router-link
                class="maincolor"
                :to="$store.getters.privacyTandCPage"
                >{{ $ft('client_shared.gdpr.tAndC') }}</router-link
              >.
            </span>
          </v-checkbox>
          <p v-if="propertyEnquiryErrors.length">
            <template v-for="(error,index) in propertyEnquiryErrors">
              <v-alert :key="index" outlined color="error" icon="warning" :value="true">
                {{ error }}
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
            {{ $ft('client_shared.forms.requestPropertyInfo') }}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-card>
</template>
<script>
export default {
  components: {},
  // hideAlertPrompt is set to true by Favs Index page as
  // the whole point of form there is to ask for more info about props:
  props: [
    'propId',
    'listingModelName',
    'alertDetails',
    'hideAlertPrompt',
    'messagePlaceHolderTkey',
  ],
  // beforeUpdate() {
  //   this.$store.commit('clearPropertyEnquiryStatus', {})
  // },
  beforeDestroy() {
    this.$store.commit('clearPropertyEnquiryStatus', {})
  },
  // mounted: function() {
  //   let i18n = this.$i18n
  //   // this.askTypes =
  // },
  data() {
    return {
      // prefLangs: [],
      // askTypes: [],
      promptTandC: false,
      tandcAccepted: true,
      successModel: true,
      // above only needed so success alert can be dismissed
      formValid: false,
      // validationErrors: [],
      messageField: {
        labelTextTKey: 'client_shared.core.message',
        multiLine: true,
        fieldName: 'message',
        inputType: 'text',
        required: true,
        validationRules: [(v) => !!v || 'Message is required'],
      },
      propertyEnquiryShortFields: [
        {
          labelTextTKey: 'client_shared.core.name',
          fieldName: 'name',
          inputType: 'text',
          validationRules: [(v) => !!v || 'Name is required'],
        },
        {
          labelTextTKey: 'client_shared.core.email',
          fieldName: 'email',
          inputType: 'text',
          required: true,
          validationRules: [
            (v) => !!v || 'E-mail is required',
            (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              'E-mail must be valid',
          ],
        },
        {
          labelTextTKey: 'client_shared.core.tel',
          fieldName: 'tel',
          inputType: 'text',
          validationRules: [],
        },
      ],
    }
  },
  computed: {
    enquiryContent() {
      // let i18n = this.$i18n
      let message = this.$i18n.t(this.messagePlaceHolderTkey)
      return {
        contact: {
          ask_type: '',
          pref_lang: '',
          name: '',
          message: message,
        },
        listing: {},
        alertAgreed: false,
        alert_details: {},
      }
    },
    // prefLangs() {
    //   return [
    //     this.$i18n.t("client_shared.core.english"),
    //     this.$i18n.t("client_shared.core.spanish"),
    //     this.$i18n.t("client_shared.core.italian"),
    //     this.$i18n.t("client_shared.core.dutch"),
    //     this.$i18n.t("client_shared.core.french")
    //   ]
    // },
    askTypes() {
      // TODO - use store getter for this like I've done with prefLangs
      return [
        this.$i18n.t('client_shared.forms.askInfo'),
        this.$i18n.t('client_shared.forms.askVisit'),
        this.$i18n.t('client_shared.forms.askCall'),
        this.$i18n.t('client_shared.forms.askRemoteViewing'),
        this.$i18n.t('client_shared.forms.askExactLocation'),
        // this.$i18n.t("client_shared.forms.askPhoto")
      ]
    },
    // privacyTandCLink() {
    //   let locale = this.$route.params.locale || "es"
    //   return "/" + locale + "/p/privacy"
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
    tandcAccepted(newValue, oldValue) {
      if (newValue === true) {
        this.promptTandC = false
      }
    },
  },
  methods: {
    onSubmitEnquiry() {
      // if (!this.tandcAccepted) {
      //   this.promptTandC = true
      //   return
      // }
      this.enquiryContent.listing.listing_ref = this.propId
      this.enquiryContent.listing.listing_model_name = this.listingModelName

      if (this.enquiryContent.alertAgreed || this.hideAlertPrompt) {
        this.enquiryContent.alert_details = this.alertDetails
      }

      this.formValid = this.$refs.enqForm.validate()
      // in case nothing has been typed in, above will display error messages
      // dec 2018 - previously just called validate() in function below
      // (like in ContactUsForm) but it seems that somehow formValid gets
      // set to true when an invalid submit is made
      if (!this.formValid) {
        return
      }

      this.enquiryContent.api_url =
        '/api_public/v3/forms/request_property_info_zoho'
      if (this.alertDetails && this.alertDetails.resalesFavsRefs) {
        this.enquiryContent.api_url =
          '/api_public/v3/forms/request_favs_info_zoho'
      }

      this.$store.dispatch('sendEnquiry', this.enquiryContent)
      // TODO: ensure above is successfull before calling below:
      // this.pendingChanges = {}
      // this.hasPendingChanges = false
    },
  },
}
</script>