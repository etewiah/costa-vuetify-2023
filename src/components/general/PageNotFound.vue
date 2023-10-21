<template>
  <v-container
    fluid
    grid-list-xl
    justify-center
    align-content-center
    slider-row
    class="pb-5 pt-5"
    style="min-height: 400px;"
  >
    <v-flex xs12>
      <v-card class="elevation-1 pb-5 pt-5">
        <v-card-title primary-title class="layout justify-center pa-0">
          <h1
            v-if="$store.state.coreStore.is404Listing"
            class="display-1 my-3"
          >{{ $ft('client_shared.core.listingNotFound') }}</h1>
          <h1 v-else class="display-1 my-3">{{ $ft('client_shared.core.pageNotFound') }}</h1>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script>
</script>
<style>
</style>