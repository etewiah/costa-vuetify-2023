<template>
  <v-container>
    <v-layout row wrap class="mb-3">
      <v-flex xs6>
        <v-flex v-if="$store.state.coreStore.currentPage.raw_html" justify-center xl10 offset-xl1 xs12>
          <div v-html="$store.state.coreStore.currentPage.raw_html"></div>
        </v-flex>
      </v-flex>
      <v-flex xs6>
        <template v-for="(clientFormConfig, index) in currentClientForms">
          <ClientForm :key="index" :clientFormConfig="clientFormConfig"></ClientForm>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ClientForm from '@jsroot/shared/components-forms/ClientForm'
export default {
  components: {
    ClientForm,
  },
  computed: {
    currentClientForms() {
      return this.$store.state.coreStore.currentClientForms
    },
    // currentPageParts() {
    //   return this.$store.state.coreStore.currentPageParts
    // }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>