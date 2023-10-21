<template>
  <div>
    <HomeHeroCosta
      :searchFields="searchFields"
      :searchSelectOptions="$store.state.coreStore.pageSearchSelectOptions"
    >
      <template v-for="details in slotDetails" :slot="details.fieldName">
        <span
          v-bind:key="details.fieldName"
          v-if="details.inputType === 'html'"
          v-html="details.fieldValue"
        ></span>
        <span v-bind:key="details.fieldName" v-else>{{
          details.fieldValue
        }}</span>
      </template>
    </HomeHeroCosta>
    <v-container
      :class="['mt-2', 'listings-teaser-cnt']"
      v-if="showMiddlingContent"
    >
      <!-- <ListingsTeaser></ListingsTeaser> -->
    </v-container>
    <v-container class="mt-1 mb-2 map-sections-cnt" v-if="$vuetify.breakpoint.mdAndUp">
      <!-- <MapSections :currentPage="$store.state.coreStore.currentPage"></MapSections> -->
    </v-container>
    <!-- <v-container
      class="mt-5 cat-boxes-cnt"
      v-if="showMiddlingContent"
      grid-list-xl
    >
      <CategoryBoxesCosta></CategoryBoxesCosta>
    </v-container> -->
    <v-container
      class="mt-4 info-boxes-cnt"
      v-if="showBottomContent"
      grid-list-xl
    >
      <!-- <ViewTestimonialsCarousel
        :currentPage="$store.state.coreStore.currentPage"
      >
      </ViewTestimonialsCarousel>
      <AgencyInfoCosta></AgencyInfoCosta> -->
    </v-container>
  </div>
</template>
<script>
// import AgencyInfoCosta from '@/components/components/AgencyInfoCosta'
// import ListingsTeaser from '@/components/components-pages/home/ListingsTeaser'
// import MapSections from '@jsroot/theme-marbella/components/MapSections'
import HomeHeroCosta from '@/components/components-search/widgets/HomeHeroCosta'
// // Oct 2023 - below probably never worked
// // import CategoryBoxesCosta from '@jsroot/theme-marbella/components/CategoryBoxesCosta'
// import ViewTestimonialsCarousel from '@/components/components-slots/ViewTestimonialsCarousel'
export default {
  metaInfo() {
    var pageTitle =
      this.$store.state.coreStore.currentPage.title_meta ||
      this.$store.state.coreStore.currentPage.page_title
    return {
      title: pageTitle,
    }
  },
  components: {
    // AgencyInfoCosta,
    // ListingsTeaser,
    // ViewTestimonialsCarousel,
    // // CategoryBoxesCosta,
    HomeHeroCosta,
    // MapSections,
  },
  watch: {
    $route: {
      handler(to, from) {
        // var pageParams = {
        //   slug: "home",
        //   props_filter: "highlighted_rent_daily"
        // }
        this.$store.dispatch('loadStdPage', 'home')
        this.$nextTick(function () {
          this.$store.dispatch('loadResalesQueryResults', 'home')
        })
        this.$store.commit('setPropCrumbs', {
          extraCrumbs: [],
          locale: this.$store.state.coreStore.currentLocale,
        })
      },
      immediate: true,
    },
  },
  updated: function () {
    // Trying to load results here led to call repeating continously
    // this.$nextTick(function() {
    //   this.$store.dispatch('loadResalesQueryResults')
    // })
  },
  computed: {
    showBottomContent() {
      // previously called showBelowFoldForAll
      return this.$store.state.coreStore.showBelowFold
    },
    showMiddlingContent() {
      // isMobileAndShowBelowFoldTriggeredOrIsDesktop
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        // In the case of mobiles, show when showBelowFold is triggered
        return this.$store.state.coreStore.showBelowFold
      } else {
        // but for desktops always show
        return true
      }
      // if (this.$store.state.coreStore.showBelowFold) {
      //   return true
      // } else {
      //   // where no user interaction is detected,
      //   // should not be visible on mobile.
      //   // Improves PageSpeed
      //   return !(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
      //   // returns false for mobiles
      // }
    },
    slotDetails() {
      let activeLocale = this.$store.state.coreStore.currentLocale
      let slotValuesAll = this.$store.getters.allViewSlotsForLocale(
        activeLocale
      )
      let currentPageSlots = this.$store.state.coreStore.currentPageSlots
      currentPageSlots.forEach(function (slotConfigField) {
        // slotConfigFields are hard coded on the server with info about how to render etc
        slotConfigField.fieldValue = slotValuesAll[slotConfigField.fieldName]
        // above adds the db stored values for each field
      })
      return currentPageSlots
    },
    searchFields() {
      if (this.$store.state.coreStore.currentPageSearchFields) {
        return this.$store.state.coreStore.currentPageSearchFields
      } else {
        return []
      }
    },
  },
}
</script>
<style>
/* http://stuffandnonsense.co.uk/blog/about/hardboiled_css3_media_queries*/

/* Smartphones (portrait and landscape) ----------- */

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  /* Styles */
}

/* Smartphones (landscape) ----------- */

@media only screen and (min-width: 321px) {
  /* Styles */
}

/* Smartphones (portrait) ----------- */

@media only screen and (max-width: 320px) {
  /* Styles */
}

/* iPads (portrait and landscape) ----------- */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  /* Styles */
}

/* iPads (landscape) ----------- */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  /* Styles */
}

/* iPads (portrait) ----------- */

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) {
  /* Styles */
}

/* Desktops and laptops ----------- */

@media only screen and (min-width: 1224px) {
  /* Styles */
}

/* Large screens ----------- */

@media only screen and (min-width: 1824px) {
  /* Styles */
}

/* iPhone 4 ----------- */

@media only screen and (-webkit-min-device-pixel-ratio: 1.5),
  only screen and (min-device-pixel-ratio: 1.5) {
  /* Styles */
}
</style>