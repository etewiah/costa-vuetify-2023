<template>
  <!-- Save the search -->
  <div>
    <v-form
      v-model="formValid"
      ref="alertForm"
      :lazy-validation="false"
      @submit.prevent="onSubmitAlertsForm"
    >
      <v-container pa-0>
        <div class="properties-list-alert-form">
          <div class="alert-box-left">
            <v-text-field
              label="Email"
              :required="emailField.required"
              :rules="emailField.validationRules"
              :autofocus="false"
              v-model="contactData.email"
              filled
              small
              color="#F7A100"
              class="alert-search"
            ></v-text-field>
          </div>
          <div class="alert-box-right">
            <v-btn
              outlined
              type="submit"
              block
              large
              color="#F7A100"
              class="mt-0"
              >{{ $ft('client_shared.forms.submit') }}</v-btn
            >
          </div>
        </div>
        <v-layout row>
          <v-flex xs12 class="pa-2">
            <v-alert
              v-if="promptTandC"
              outlined
              color="error"
              icon="warning"
              :value="true"
              >{{ $ft('client_shared.gdpr.tAndCAcceptancePrompt') }}</v-alert
            >
            <v-checkbox
              class="mt-0"
              :required="true"
              label
              v-model="tandcAccepted"
            >
              <span slot="label">
                {{ $ft('client_shared.gdpr.tAndCAcceptance') }}
                <router-link
                  class="maincolor"
                  :to="$store.getters.privacyTandCPage"
                  >{{ $ft('client_shared.gdpr.tAndC') }}</router-link
                >.
              </span>
            </v-checkbox>
            <p v-if="alertFormErrors.length">
              <template v-for="(error, index) in alertFormErrors">
                <v-alert
                  outlined
                  color="error"
                  :key="index"
                  icon="warning"
                  :value="true"
                  >{{ error }}</v-alert
                >
              </template>
            </p>
            <p v-if="alertFormSuccess.length">
              <v-alert
                outlined
                color="success"
                dismissible
                v-model="successModel"
                >{{ alertFormSuccess }}</v-alert
              >
            </p>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>
<style>
</style>
<script>
// import ValidatableTextField from '@jsroot/shared/components-forms/ValidatableTextField'
export default {
  components: {
    // ValidatableTextField
  },
  props: ['searchParams'],
  mounted: function () {},
  data() {
    return {
      promptTandC: false,
      tandcAccepted: false,
      emailField: {
        labelTextTKey: 'client.email',
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
      checkboxErrors: '',
      checkbox: '',
      successModel: true,
      // above only needed so success alert can be dismissed
      formValid: false,
      contactData: {
        email: '',
      },
      alertData: {
        // message: ""
      },
    }
  },
  watch: {
    tandcAccepted(newValue, oldValue) {
      if (newValue === true) {
        this.promptTandC = false
      }
    },
  },
  computed: {
    alertFormSending() {
      return this.$store.state.formsStore.alertFormSending
    },
    alertFormSuccess() {
      return this.$store.state.formsStore.alertFormSuccess
    },
    alertFormErrors() {
      return this.$store.state.formsStore.alertFormErrors
    },
  },
  methods: {
    onSubmitAlertsForm() {
      if (!this.tandcAccepted) {
        this.promptTandC = true
        return
      }
      if (!this.formValid) {
        this.$refs.alertForm.validate()
        // in case nothing has been typed in, above will display error messages
        return
      }
      this.alertData.query = this.searchParams
      this.$store.dispatch('sendAlertRequest', {
        alertData: this.alertData,
        contact: this.contactData,
      })
    },
  },
}
</script>