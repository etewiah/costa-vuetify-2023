<!-- eslint-disable vue/no-parsing-error -->
<template>
  <v-container pt-5 pb-5 grid-list-xl>
    <!-- Development -->
    <v-card class="inmo-card px-4 pb-5 about_text my-5">
      <v-img       src="https://res.cloudinary.com/inmo-design/image/upload/v1560439674/logo-contact-form_cdjbx1.svg"
style="display:none" contain aspect-ratio="1" width="175" class="logo-contact"></v-img>
      <v-flex v-if="$store.state.coreStore.currentPage.raw_html" justify-center xl10 offset-xl1 xs12>
        <div v-html="$store.state.coreStore.currentPage.raw_html"></div>
      </v-flex>
      <v-flex lg12 md12 sm12 hidden-md-and-down>
        <v-btn color="#F7A100" :to="{path: servicesLink}" dark class="mb-4">
          << {{ $ft("client_shared.labels.backToServices") }} </v-btn> <v-card class="pa-4">
            <div class="title mb-3">
              {{ $ft("client_shared.forms.reqInfo") }}
            </div>
            <ServicesWideEnquiryForm></ServicesWideEnquiryForm>
    </v-card>
    </v-flex>
    </v-card>
  </v-container>
</template>
<script>
import ServicesWideEnquiryForm from '@/components/components-forms/ServicesWideEnquiryForm'
export default {
  components: {
    ServicesWideEnquiryForm,
    // OurAgency,
    // ContentHtml,
  },
  computed: {
    servicesLink() {
      let locale = this.$store.state.coreStore.currentLocale
      // this.$route.params.locale || "es"
      return "/" + locale + "/p/our-services"
    },
  }
}
</script>
<style scoped>
</style>