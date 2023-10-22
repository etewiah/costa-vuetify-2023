<template>
  <span style>
    <!-- Search Text Box -->
    <v-card v-if="!hideMessagesBox" class="mb-4 inmo-card px-3" left>
      <v-card-title primary-title>
        <div class="results-message-container">
          <div class="headline mb-2">{{ resultsTitle }}</div>
          <div class="grey--text">
            <p>{{ resultsText }}</p>
            <p>{{ resultsSuffix }}</p>
          </div>
        </div>
        <AlertsFormCosta :searchParams="computedSearchParams"></AlertsFormCosta>
      </v-card-title>
    </v-card>
    <!-- Order Box -->
    <v-container class="px-0">
      <v-layout row wrap>
        <v-flex xl12 lg12 class="hidden-sm-and-down order-column">
          <div v-if="!alertsMode" class="text-xs-center top-sort-sr">
            <span class="px-0 font-weight-bold"
              >{{ $ft('client_shared.fieldLabels.sortBy') }}:</span
            >
            <v-btn
              class=""
              @click="changeSort('3')"
              :color="sortCode === '3' ? 'primary' : ''"
              flat
              >{{ $ft('client_shared.fieldLabels.lastUpdated') }}</v-btn
            >
            <v-btn
              class=""
              @click="changeSort('0')"
              :color="sortCode === '0' ? 'primary' : ''"
              flat
            >
              {{
                $vuetify.breakpoint.smAndDown
                  ? $ft('client_shared.fieldLabels.price')
                  : $ft('client_shared.fieldLabels.priceAsc')
              }}
              <v-icon class="hidden-md-and-up">keyboard_arrow_up</v-icon>
            </v-btn>
            <v-btn
              class=""
              @click="changeSort('1')"
              :color="sortCode === '1' ? 'primary' : ''"
              flat
            >
              {{
                $vuetify.breakpoint.smAndDown
                  ? $ft('client_shared.fieldLabels.price')
                  : $ft('client_shared.fieldLabels.priceDesc')
              }}
              <v-icon class="hidden-md-and-up">keyboard_arrow_down</v-icon>
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs12 v-if="showLoadingBar">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
        <v-flex v-else xl12 lg12 xs12>
          <v-pagination
            v-if="pagesCount > 1"
            class="top-pagination-sr"
            v-model="queryInfo.CurrentPage"
            :length="pagesCount"
            @input="onPageChange"
          ></v-pagination>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- Property Container -->
    <v-container grid-list-xl fluid px-0>
      <!-- <v-layout class="mb-1" row wrap>
        <v-flex xs12 v-if="showLoadingBar">
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
      </v-layout>-->
      <!-- <transition name="search-results-trans"> -->
      <v-layout v-if="showMiddlingContent" class="mb-3" row wrap>
        <v-flex
          xs12
          sm12
          md12
          lg12
          xl12
          my-4
          v-for="(property, index) in propertiesInView"
          :key="property.Reference"
        >
          <ResalesRowItemCosta
            :alertsMode="alertsMode"
            :totalCount="totalCount"
            :useCarousel="true"
            :property="property"
            :offSet="offSet"
            :index="index"
            :saleOrRentalCat="saleOrRentalCat"
          ></ResalesRowItemCosta>
        </v-flex>
      </v-layout>
      <!-- </transition> -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-pagination
            v-if="pagesCount > 1"
            class
            v-model="queryInfo.CurrentPage"
            :length="pagesCount"
            @input="onPageChangeBottom"
          ></v-pagination>
        </v-flex>
      </v-layout>
    </v-container>
  </span>
</template>
<script>
import AlertsFormCosta from '@/components/components-forms/AlertsFormCosta'
import ResalesRowItemCosta from '@/components/components-resales/ResalesRowItemCosta'
export default {
  components: {
    ResalesRowItemCosta,
    AlertsFormCosta,
  },
  props: {
    computedSearchParams: Object,
    saleOrRentalCat: String,
    incResultsObject: Object,
    alertsMode: {
      type: Boolean,
      default: false,
    },
    cannedCollectionMode: {
      type: Boolean,
      default: false,
    },
    propertiesToDisplay: Array,
    queryInfo: Object,
    showLoadingBar: Boolean,
  },
  watch: {
    propertiesToDisplay(newPage, oldPage) {
      // To prevent issue where scroll to last viewed result happened after
      // list of other results displayed
      // May become redundant after I load data before route enter
      setTimeout(() => {
        let lastViewedRef = localStorage.getItem('pwb-last-viewed-ref') || null
        if (lastViewedRef) {
          let lastViewedElement = document.querySelector(
            '#res-card-' + lastViewedRef
          )
          if (lastViewedElement) {
            lastViewedElement.scrollIntoView({
              behavior: 'auto',
              block: 'start',
              inline: 'nearest',
            })
          }
          // Clear out last viewed to prevent unpredictable scrolling
          localStorage.removeItem('pwb-last-viewed-ref')
        }
        this.$el.style.visibility = 'visible'
      }, 10)
    },
  },
  methods: {
    onPageChange(newPage) {
      let fieldDetails = {
        newValue: newPage,
        queryStringName: 'page',
      }
      this.$emit('paginationTrigger', fieldDetails)
    },
    onPageChangeBottom(newPage) {
      let fieldDetails = {
        newValue: newPage,
        queryStringName: 'page',
      }
      this.$emit('paginationTrigger', fieldDetails)
      setTimeout(() => {
        document.querySelector('.top-sort-sr').scrollIntoView()
      }, 100)
    },
    changeSort(sortVal) {
      let fieldDetails = {
        newValue: sortVal,
        queryStringName: 'sort',
      }
      this.$emit('paginationTrigger', fieldDetails)
    },
  },
  mounted() {
    this.$el.style.visibility = 'hidden'
    this.$nextTick(() => {
      setTimeout(() => {
        this.propertiesInViewCount = 30
      }, 500)
    })
  },
  data() {
    return {
      propertiesInViewCount: 60,
    }
  },
  computed: {
    hideMessagesBox() {
      return this.alertsMode || this.cannedCollectionMode
    },
    showMiddlingContent() {
      return true
      // May 2020 - had to disable below as scrolling wasn't triggering
      // on long mobile phones....
      // // isMobileAndShowBelowFoldTriggeredOrIsDesktop
      // if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
      //   // In the case of mobiles, show when showBelowFold is triggered
      //   return this.$store.state.coreStore.showBelowFold
      // } else {
      //   // but for desktops always show
      //   return true
      // }
    },
    resultsTitle() {
      if (this.incResultsObject) {
        return this.incResultsObject.results_title || ''
      } else {
        return this.$store.getters.getResalesResultsTitle
      }
    },
    resultsText() {
      if (this.incResultsObject) {
        return this.incResultsObject.results_text || ''
      } else {
        return this.$store.getters.getResalesResultsText
      }
    },
    resultsSuffix() {
      if (this.incResultsObject) {
        return this.incResultsObject.results_suffix || ''
      } else {
        return this.$store.getters.getResalesResultsSuffix
      }
    },
    totalCount() {
      return this.queryInfo
        ? this.queryInfo.PropertyCount
        : this.propertiesInView.length
    },
    offSet() {
      if (this.queryInfo) {
        let currPage = this.queryInfo.CurrentPage || 1
        return currPage * 30 - 29
      } else {
        return 1
      }
    },
    propertiesInView() {
      return this.propertiesToDisplay
      // below was attempt to optimise rendering of results
      // let propertiesToDisplay = this.propertiesToDisplay || []
      // return propertiesToDisplay.slice(0, this.propertiesInViewCount)
    },
    sortCode() {
      // I could implement my own sort codes but for now I'll
      // go with the resales defaults. 3 is by last updated date (most recent first)
      return this.$route.query.sort || '3'
    },
    pagesCount() {
      if (this.queryInfo) {
        return Math.ceil(
          this.queryInfo.PropertyCount / this.queryInfo.PropertiesPerPage
        )
      } else {
        return 0
      }
    },
  },
}
</script>
<style scoped>
.search-results-trans-enter-active {
  animation: coming 0.3s;
  animation-timing-function: cubic-bezier(0.65, 0, 0.32, 1.55);
  opacity: 0;
}

.search-results-trans-leave-active {
  animation: going 0.1s;
  animation-timing-function: cubic-bezier(0.8, -0.49, 0.36, 1);
}
</style>