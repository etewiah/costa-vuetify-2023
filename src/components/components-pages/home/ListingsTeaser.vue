<template>
  <v-layout class="mb-3" row wrap>
    <v-layout class="home-props-row-outer" row wrap>
      <v-flex xs12>
        <QuerySetResultsInline :resultSet="$store.getters.getResalesSummListingsForSale"></QuerySetResultsInline>
      </v-flex>
      <v-flex xs12>
        <QuerySetResultsInline :resultSet="$store.getters.getResalesSummListingsFeatured"></QuerySetResultsInline>
      </v-flex>
      <v-flex xs12>
        <QuerySetResultsInline :resultSet="$store.getters.getResalesSummListingsPromotions"></QuerySetResultsInline>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
import QuerySetResultsInline from '@/components/components-search/QuerySetResultsInline'
export default {
  components: {
    QuerySetResultsInline
  }
}
</script>
<style scoped>
</style>