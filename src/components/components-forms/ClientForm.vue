<template>
  <transition name="slide-in-left">
    <v-layout row wrap class="">
      <div :class="clientFormConfig.cssClasses">
        <v-card v-if="showTrans" class="elevation-2">
          <v-card-title primary-title class="layout">
            <div class="headline ml-2">
              {{ clientFormConfig.header_text }}:
            </div>
          </v-card-title>
          <v-card-text>
            <v-form v-model="formValid" ref="enqForm" lazy-validation @submit.prevent="onSubmitEnquiry">
              <v-layout v-for="(field) in formFields" :key="field.fieldName" row>
                <v-flex xs12 sm12 offset-sm0>
                  <!-- <ValidatableTextField :field="field" :enquiryContent="enquiryContent"></ValidatableTextField> -->
                </v-flex>
              </v-layout>
              <p v-if="clientFormErrors.length">
                <template v-for="(error,index) in clientFormErrors">
                  <v-alert :key="index" outline color="error" icon="warning" :value="true">
                    {{error}}
                  </v-alert>
                </template>
              </p>
              <p v-if="clientFormSuccess.length">
                <v-alert outline color="success" dismissible v-model="successModel">
                  {{ clientFormSuccess }}
                </v-alert>
              </p>
              <v-flex xs12 sm12 offset-sm0>
                <template v-if="clientFormSending">
                  <v-progress-linear :indeterminate="true"></v-progress-linear>
                </template>
                <v-btn v-if="clientFormSuccess.length < 1" class="accent" type="submit">
                  {{ clientFormConfig.submit_text }}
                </v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </v-layout>
  </transition>
</template>
<style>
@keyframes slide-in-left {
  0% {
    transform: scale(0);
    left: -1000px;
  }
  80% {
    transform: scale(0.9);
  }
  100% {
    left: 0;
    transform: scale(1);
  }
}

.slide-in-left-enter-active {
  animation: slide-in-left 0.5s;
}

.slide-in-left-leave-active {
  animation: slide-in-left 0.5s reverse;
}
</style>
<script>
// // import ValidatableTextField from '@/components/components-forms/ValidatableTextField'
export default {
  components: {
    // ValidatableTextField
  },
  props: ["clientFormConfig"],
  mounted: function() {
    var that = this
    setTimeout(function() {
      that.showTrans = true
    }, 500)
  },
  data() {
    return {
      showTrans: false,
      successModel: true,
      // above only needed so success alert can be dismissed
      formValid: false,
      enquiryContent: {
        name: "",
        message: ""
      }
    }
  },
  computed: {
    formFields() {
      var formFields = this.clientFormConfig.fields
      return formFields
    },
    clientFormSending() {
      return this.$store.state.formsStore.clientFormSending
    },
    clientFormSuccess() {
      return this.$store.state.formsStore.clientFormSuccess
    },
    clientFormErrors() {
      return this.$store.state.formsStore.clientFormErrors
    },
  },
  methods: {
    onSubmitEnquiry() {
      if (!this.formValid) {
        this.$refs.enqForm.validate()
        // in case nothing has been typed in, above will display error messages
        return
      }
      var clientFormParams = {
        formData: this.enquiryContent,
        formUrlAppend: this.clientFormConfig.endpoint,
        formConfigId: this.clientFormConfig.id,
        formConfigName: this.clientFormConfig.name
      }
      this.$store.dispatch('sendClientForm', clientFormParams)
    }

  }
}
</script>