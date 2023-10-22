<!-- TODO - unset current property when navigating away.... -->
<template>
  <v-content class="mt-0 pt-0">
    <DetailsContainer
      v-if="propertyIsVisible"
      :similarProps="similarProps"
      :autoDesc="autoDesc"
      :currentProperty="currentProperty"
      :saleOrRentalCat="saleOrRentalCat"
    ></DetailsContainer>
    <v-card v-else class="elevation-1">
      <v-card-title primary-title class="layout justify-center pa-0">
        <h1 class="display-1 my-3">{{ $ft('client.propNotPublished') }}</h1>
      </v-card-title>
    </v-card>
  </v-content>
</template>
<script>
import DetailsContainer from '@/components/components-resales/ResalesDetailsContainerCosta'
import { remove } from 'lodash'
export default {
  metaInfo() {
    var pageTitle = this.$store.state.resalesStore.autoTitle || ''
    return {
      title: pageTitle + ' | Costa Specialist'
    }
  },
  components: {
    DetailsContainer
  },
  props: [],
  beforeRouteUpdate(to, from, next) {
    this.$store.commit('setCurrentResalesProperty', { result: {} })
    this.$store.commit('setAutoTitle', { result: '' })
    next()
  },
  // above and below to stop previous property
  // flashing up briefly before disappearing
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setCurrentResalesProperty', { result: {} })
    this.$store.commit('setAutoTitle', { result: '' })
    this.$store.commit('setPropCrumbs', {
      extraCrumbs: [],
      locale: this.$store.state.coreStore.currentLocale
    })
    next()
  },
  watch: {
    $route: {
      handler(to, from) {
        let detailsParams = {
          salesOrRentals: 'sales',
          propertyId: to.params.slugOrId
        }
        if (to.name === 'resalesRentalDetails') {
          detailsParams.salesOrRentals = 'rentals'
        }
        this.$store.dispatch('loadResaleDetails', detailsParams)
      },
      immediate: true
    },
    '$store.state.resalesStore.currentProperty': {
      handler(newVal) {
        if (newVal && newVal.Reference) {
          // let lastViewedRef = newVal.Reference
          localStorage.setItem('pwb-last-viewed-ref', newVal.Reference)
          var localeUrls = newVal.urls
          this.$store.commit('setLocaleUrls', { result: localeUrls })
          let extraCrumbs = []
          let searchRouteName = 'resalesSearch'
          if (this.saleOrRentalCat === 'rentals') {
            searchRouteName = 'resalesRentalSearch'
          }
          if (newVal.Location) {
            let propLocSearchCrumb = {
              text: newVal.Location,
              disabled: false,
              to: {
                name: searchRouteName,
                query: {
                  city: newVal.Location
                },
                params: {
                  locale: this.$store.state.coreStore.currentLocale,
                  preamble: this.$store.getters.listingPreamble
                }
              }
            }
            extraCrumbs.push(propLocSearchCrumb)
          }

          let propTypeSearchCrumb = {
            text: newVal.Type,
            disabled: false,
            to: {
              name: searchRouteName,
              query: {
                city: newVal.Location,
                // Resales does not return Type as Id
                // so have to work it out server side
                type: newVal.TypeId
              },
              params: {
                locale: this.$store.state.coreStore.currentLocale,
                preamble: this.$store.getters.listingPreamble
              }
            }
          }
          extraCrumbs.push(propTypeSearchCrumb)
          extraCrumbs.push({
            // text: this.$store.state.resalesStore.autoTitle,
            text: newVal.Reference,
            disabled: true
          })

          //June 2020 - temporarily disabling breadcrumbs for rentals
          if (this.saleOrRentalCat === 'rentals') {
            extraCrumbs = []
          }
          this.$store.commit('setPropCrumbs', {
            extraCrumbs: extraCrumbs,
            locale: this.$store.state.coreStore.currentLocale
          })

          this.$nextTick(function() {
            let similarPropertiesQueryParams = {}
            if (newVal && newVal.Reference) {
              similarPropertiesQueryParams = this.$store.getters.getSimilarPropertiesQueryParams(
                newVal
              )
              similarPropertiesQueryParams.op = this.saleOrRentalCat
              this.$store.dispatch(
                'searchFuzzyFromParamsResales',
                similarPropertiesQueryParams
              )
            }
          })
        }
      }
    },
    '$store.state.resalesStore.resultsObject.listings': {
      handler(newListingsSearchResults) {
        let currentPropertyRef = this.currentProperty.Reference
        // let newListingsSearchResults = this.$store.state.resalesStore.resultsObject.listings
        // from lodash:
        remove(newListingsSearchResults, function(n) {
          return n.Reference === currentPropertyRef
        })
        //June 2020 - temporarily disabling similar props for rentals
        if (this.saleOrRentalCat === 'rentals') {
          this.similarProps = []
        } else {
          this.similarProps = newListingsSearchResults.slice(0, 6)
        }

        // Number of props here should correspond a bit with what is retrieved from server here:
        // /app/controllers/api_public/v3/search_cc_resales_controller.rb
      }
    }
  },
  data() {
    return {
      similarProps: []
    }
  },
  computed: {
    saleOrRentalCat() {
      if (this.$route.name === 'resalesRentalDetails') {
        return 'rentals'
      } else {
        return 'sales'
      }
    },
    currentProperty() {
      return this.$store.state.resalesStore.currentProperty || {}
    },
    autoDesc() {
      return this.$store.state.resalesStore.autoDesc || ''
    },
    propertyIsVisible() {
      if (this.currentProperty.title) {
        return this.currentProperty.visible
      } else {
        return true
      }
    }
  }
}
</script>
<style scoped>
</style>