<template>
  <v-dialog v-model="showModal" @input="modalChanged" max-width="350px">
    <v-card class="pa-3 inmo-card">
      <div>
        <NarrowEnquiryForm
          :alertDetails="alertDetails"
          :propId="currentProperty.Reference"
          listingModelName="resales_listing"
        ></NarrowEnquiryForm>
      </div>
    </v-card>
  </v-dialog>
</template>
<style>
</style>
<script>
import NarrowEnquiryForm from '@/components/components-forms/InmoNarrowEnquiryForm'
export default {
  components: {
    NarrowEnquiryForm
  },
  props: ['currentModalVisible', 'alertDetails', 'currentProperty'],
  mounted: function() {},
  data() {
    return {
      showModal: false,
      formValid: false
    }
  },
  watch: {
    '$store.state.formsStore.propertyEnquirySuccess'(newValue) {
      setTimeout(() => {
        // oct 2019 - potential TODO:
        // bubble up success message and display it in a snackbar
        this.$emit('hideCurrentModal')
      }, 2000)
    },
    currentModalVisible(newValue) {
      // If I try using currentModalVisible directly
      // I get a warning about mutating a prop
      this.showModal = newValue
    }
  },
  computed: {
    // propertyEnquirySuccess() {
    //   return this.$store.state.formsStore.propertyEnquirySuccess
    // }
  },
  methods: {
    // https://github.com/vuetifyjs/vuetify/issues/4057
    // idea for below from above.
    // Works because
    // v-model directive is just sugar for value prop + input event
    modalChanged(modalIsOpen) {
      // roundabout way of doing this but only one I can find that works.
      // When the modal is closed I need to fire an event to the
      // container where importModalVisible can be set to false
      if (!modalIsOpen) {
        this.$emit('hideCurrentModal')
      }
      //
    },
    closeForm() {
      this.$emit('hideCurrentModal')
    }
  }
}
</script>