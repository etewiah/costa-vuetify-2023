<template>
  <v-card style="overflow: hidden;" class="carrousel-property" hover :to="{name: 'promotionDetails',
         params: { locale: $store.state.coreStore.currentLocale, 
         slugOrId: property.id,
         preamble: routePreamble
       }}">
    <!-- Image Property Slider -->
    <v-layout>
      <div class="gallery">
        <div class="gallery-content">
          <ul>
            <li>
              <div class="square">
                <picture>
                  <div class="image-insider"><img :src="property.listing_photos[0] ? property.listing_photos[0].image_url : ''" alt="property alt"></div>
                </picture>
                <div class="showcase-informations">
                  <p class="price"> {{ $ft('client_shared.fieldLabels.from')}}
   <DisplayPriceLegacy :symbolLast="false" :noCents="true" :sourceCurrency="property.currency" :displayCurrency="property.currency" :value="property.price_sale_range_from_cents"></DisplayPriceLegacy></p>
                  <p class="city">{{property.city}}</p>
                </div>
              </div>
            </li>
            <li>
              <div class="square">
                <picture>
                  <div class="image-insider"><img :src="property.listing_photos[1] ? property.listing_photos[1].image_url : ''" alt="property alt"></div>
                </picture>
              </div>
            </li>
            <li>
              <div class="square">
                <picture>
                  <div class="image-insider"><img :src="property.listing_photos[2] ? property.listing_photos[2].image_url : ''" alt="property alt"></div>
                </picture>
              </div>
            </li>
            <li>
              <div class="square">
                <picture>
                  <div class="image-insider"><img :src="property.listing_photos[3] ? property.listing_photos[3].image_url : ''"  alt="property alt"></div>
                </picture>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </v-layout>
    <v-card-title primary-title>
      <v-layout row wrap>
        <v-flex xs8>
          <div class="headline font-weight-bold">{{ property.title || property.reference}}</div>
          <div class="subheading grey--text mb-1">{{ property.title_summary || "" }}</div>
        </v-flex>
        <v-flex xs4>
          <v-btn outline block class="pa-0 mx-0">
            {{ $ft('client_shared.labels.viewDevelopment')}}
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-title>

  </v-card>
</template>
<script>
import DisplayPriceLegacy from '@/components/general/DisplayPriceLegacy'
// import truncate from 'vue-truncate-collapsed'
export default {
  components: {
    DisplayPriceLegacy,
    // truncate
  },
  props: ["property", "showTransition", "index", "noTransitionDelay"],
  data: () => ({
    // showTransitionWithDelay: false
  }),
  watch: {
    // 'showTransition'(newVal, oldVal) {
    //   if (newVal) {
    //     var delay = this.index * 10
    //     var that = this
    //     setTimeout(function() {
    //       that.showTransitionWithDelay = true
    //     }, delay)
    //   }
    // }
  },
  computed: {
    // oct 2018 - TODO - use normal href as they are more SEO friendly
    routePreamble: function() {
      var routePreamble = "promociones"
      // really nasty having this hardcoded but can't see 
      // an alternative for h2m
      if (this.$store.state.coreStore.currentLocale === "en") {
        routePreamble = "developments"
      }
      return routePreamble
    }
  },
  mounted: function() {
    if (this.noTransitionDelay) {
      this.showTransitionWithDelay = true
    }
  }
}
</script>
<style scoped>
.info-text {
  font-size: 22px;
  color: darkgray;
}

.v-btn .v-btn__content .v-icon {
  color: darkgray;
}

.summ-image {
  height: 550px;
  width: 100%;
  background-size: cover;
}

h4 {
  color: darkgray;
  text-transform: none;
  font: 600 20px Raleway, sans-serif;
  margin: 16px 8px;
}

.resales-row-title {
  height: 26px;
}
</style>