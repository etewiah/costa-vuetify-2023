<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex justify-center xl10 offset-xl1 xs12>
        <!-- <OurAgency :blockContents="currentPageParts.our_agency"></OurAgency> -->
      </v-flex>
      <v-flex v-if="$store.state.coreStore.currentPage.raw_html" justify-center xl10 offset-xl1 xs12>
        <div v-html="$store.state.coreStore.currentPage.raw_html"></div>
      </v-flex>
      <v-flex justify-center xl10 offset-xl1 xs12>
        <template v-for="(clientFormConfig, index) in currentClientForms">
          <ClientForm :key="index" :clientFormConfig="clientFormConfig"></ClientForm>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import ContentHtml from '@jsroot/shared/components/ContentHtml'
// import OurAgency from '@jsroot/shared/components/OurAgency'
// import PropertiesRow from '@jsroot/theme-vienna/components/PropertiesRow'
import ClientForm from '@/components/components-forms/ClientForm'
export default {
  // props: ["currentPageParts", "currentClientForms"],
  components: {
    ClientForm,
    // OurAgency,
    // ContentHtml,
  },
  computed: {
    currentClientForms() {
      return this.$store.state.coreStore.currentClientForms
    },
    currentPageParts() {
      return this.$store.state.coreStore.currentPageParts || {}
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>