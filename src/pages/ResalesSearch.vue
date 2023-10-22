<template>
  <section fluid>
    <v-container px-0>
      <v-layout row wrap search-container>
        <!-- CHANGED V.3 -->
        <v-flex :class="mainContentClasses">
          <!-- <ResalesSearchResults
            :computedSearchParams="computedSearchParams"
            :isLoading="$store.state.resalesStore.loadingSearch"
            :propertiesToDisplay="listingsToDisplay"
            @paginationTrigger="triggerSearchUpdate"
            saleOrRentalCat="sale"
            :queryInfo="$store.getters.getResalesQueryInfo"
          ></ResalesSearchResults> -->
          <div v-html="$store.state.coreStore.currentPage.raw_html"></div>
        </v-flex>
        <v-flex xl3 md4 sm5 xs12 pr-4 class="sidebar">
          <!-- <AlertsForm :searchParams="computedSearchParams"></AlertsForm> -->
          <template v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm">
            <!-- <SearchFiltersModal
              :isLoading="$store.state.resalesStore.loadingSearch"
              :searchSelectOptions="
                $store.state.searchStore.searchSelectOptions
              "
              :queryParams="queryParams"
              :searchFields="searchFields"
              @triggerSearchUpdate="triggerSearchUpdate"
              @hideCurrentModal="hideSearchModal"
            ></SearchFiltersModal> -->
          </template>
          <template v-else>
            <ResalesVertical
              :isLoading="$store.state.resalesStore.loadingSearch"
              :searchSelectOptions="
                $store.state.searchStore.searchSelectOptions
              "
              :queryParams="queryParams"
              :searchFields="searchFields"
              @triggerSearchUpdate="triggerSearchUpdate"
            ></ResalesVertical>
          </template>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xl10 offset-xl1 xs12>
          <ContentHtml
            :blockContents="currentPageParts.content_html"
          ></ContentHtml>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>
<script>
import _ from 'lodash'
// import ResalesSearchResults from '@/components/components-resales/ResalesSearchResults'
import ResalesVertical from '@/components/components-search/widgets/ResalesVertical'
// import AlertsForm from '@/components-forms/AlertsForm'
import ContentHtml from '@/components/general/ContentHtml'
// import SearchFiltersModal from '@/components-search/widgets/SearchFiltersModal'
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
    // SearchFiltersModal,
    // AlertsForm,
    // ResalesSearchResults,
    ResalesVertical,
    ContentHtml,
  },
  data() {
    return {
      // searchPageReady: false
      // searchModalVisible: false
    }
  },
  mounted: function () {
    this.loadSearch('sales')
  },
  watch: {
    $route(to, from) {
      if (to.name !== from.name || to.params.locale !== from.params.locale) {
        // when arriving from a diff route or locale, load search anew
        this.loadSearch('sales')
      } else {
        // let pageHasChanged = false
        // if (to.query.page && (from.query.page !== to.query.page)) {
        //   pageHasChanged = true
        // }
        // if (!pageHasChanged) {
        //   // check above to avoid clearing out search result message
        //   // when only page is changing
        //   this.$store.commit('setResalesSearchResultsObject', { result: {} })
        // }
        // Spt 2019 - above was just to clear the search results
        // but now I'm using transitions with a check on isLoading
        // so not needed

        // where only the query params have changed, do a simple update
        this.updateSearchResults()
      }
      this.updateCrumbs()
    },
    '$store.state.coreStore.currentPage'(newVal) {
      // this.searchPageReady = true
      // above needed because currentPage.raw_html etc from
      // previous page was getting rendered before this page was ready
      var localeUrls = newVal.urls
      this.$store.commit('setLocaleUrls', { result: localeUrls })
      this.updateCrumbs()
    },
  },
  methods: {
    hideSearchModal() {
      setTimeout(() => {
        document.querySelector('#app').scrollIntoView()
      }, 10)
      // below would not work on huawei mobile:
      // this.$nextTick(() => {
      //   document.querySelector('#app').scrollIntoView()
      //   // const elToScrollTo = '.resales-results-ct'
      //   // if (elToScrollTo && document.querySelector(elToScrollTo)) {
      //   //   document.querySelector(elToScrollTo).scrollIntoView()
      //   // }
      //   // if (elToScrollTo && document.querySelector(elToScrollTo)) {
      //   // location.href = elToScrollTo;
      //   // }
      // })
    },
    updateCrumbs: function () {
      let extraCrumbs = []
      let pageTitle =
        this.$store.state.coreStore.currentPage.title_meta ||
        this.$store.state.coreStore.currentPage.page_title
      let cityToSearch = this.queryParamsJson['city']
      if (cityToSearch && cityToSearch.split(',').length === 1) {
        pageTitle = cityToSearch
      }
      extraCrumbs.push({
        // text: this.$store.state.resalesStore.autoTitle,
        text: pageTitle,
        disabled: true,
      })
      this.$store.commit('setPropCrumbs', {
        extraCrumbs: extraCrumbs,
        locale: this.$store.state.coreStore.currentLocale,
      })
    },
    updateSearchResults: function () {
      var searchParams = JSON.parse(JSON.stringify(this.queryParams))
      searchParams['op'] = 'sales'
      //for searchFromParamsResales need to set default params here
      this.searchFields.forEach(function (searchField) {
        // here I set searchParams that have not changed to their default
        if (searchField.defaultValue) {
          searchParams[searchField.queryStringName] =
            searchParams[searchField.queryStringName] ||
            searchField.defaultValue
        }
      })
      this.$store.dispatch('searchFromParamsResales', searchParams)
    },
    loadSearch: function (operation) {
      var searchParams = JSON.parse(JSON.stringify(this.queryParams))
      searchParams['op'] = operation
      // previously I was setting param defaults here but now doing that on the server
      //   // # Feb 2020 deprecating old canned search for cities:
      // if (this.$route.name === 'resalesCitySearch') {
      //   // This is what triggers url endpoint
      //   // that will find page corresponding to city search
      //   // searchParams['city_search_key'] = this.$route.params.city_search_key
      //   this.$store.dispatch(
      //     'loadCannedSearch',
      //     this.$route.params.city_search_key
      //   )
      // } else {
      //   this.$store.dispatch('loadResalesSearchIncPage', searchParams)
      // }
      this.$store.dispatch('loadResalesSearchIncPage', searchParams)
    },
    // below is called each time an input is changed and triggers a
    // url change and page refresh (via ajax)
    triggerSearchUpdate(fieldDetails) {
      let outgoingQueryParams = JSON.parse(JSON.stringify(this.queryParams))
      // need to do JSON trick above as passing $route.query to
      // $router.push does not work
      if (fieldDetails.inputType === 'slider') {
        let minQueryStringName = fieldDetails.fieldName + '_min'
        let maxQueryStringName = fieldDetails.fieldName + '_max'
        outgoingQueryParams[minQueryStringName] = fieldDetails.newValue[0]
        outgoingQueryParams[maxQueryStringName] = fieldDetails.newValue[1]
        // outgoingQueryParams[fieldDetails.queryStringName] = fieldDetails.newValue
      } else {
        let newValue = fieldDetails.newValue
        if (Array.isArray(newValue)) {
          _.pull(newValue, '')
          newValue = newValue.toString()
        }
        if (newValue === '') {
          outgoingQueryParams[fieldDetails.queryStringName] = undefined
          // undefined above will result in querystring
          // getting removed from url
        } else {
          outgoingQueryParams[fieldDetails.queryStringName] = newValue
        }
      }
      // this.searchFields.forEach(function(searchField) {
      //   // here I set outgoingQueryParams that have not changed to their default
      //   if (searchField.defaultValue) {
      //     outgoingQueryParams[searchField.queryStringName] = outgoingQueryParams[searchField.queryStringName] || searchField.defaultValue
      //   }
      // })
      this.searchFields.forEach(function (searchField) {
        // here I set outgoingQueryParams that have not changed to their default
        if (searchField.defaultValue && searchField.inputType !== 'hidden') {
          // For price_min and price_max
          outgoingQueryParams[searchField.queryStringName] =
            outgoingQueryParams[searchField.queryStringName] ||
            searchField.defaultValue
        }
      })
      if (fieldDetails.queryStringName !== 'page') {
        // prevent wrong page being used when a new query is made
        delete outgoingQueryParams.page
      }
      // if (this.$route.params.city_search_key) {
      //   this.$router.push({
      //     name: 'resalesCitySearch',
      //     query: outgoingQueryParams
      //   })
      // } else {
      //   this.$router.push({ name: 'resalesSearch', query: outgoingQueryParams })
      // }
      this.$router.push({ name: 'resalesSearch', query: outgoingQueryParams })
    },
  },
  computed: {
    mainContentClasses() {
      if (this.isCannedSearch) {
        return 'xs12 main-content resales-results-ct'
      } else {
        return 'xl9 md8 sm7 xs12 pl-5 main-content resales-results-ct'
      }
    },
    isCannedSearch() {
      return false
      // Feb 2020 - no longer using this
      // return this.$route.name === 'resalesCitySearch'
    },
    computedSearchParams() {
      var searchParams = JSON.parse(JSON.stringify(this.queryParams))
      // searchParams['op'] = operation
      //for searchFromParamsResales need to set default params here
      this.searchFields.forEach(function (searchField) {
        // here I set searchParams that have not changed to their default
        if (searchField.defaultValue) {
          searchParams[searchField.queryStringName] =
            searchParams[searchField.queryStringName] ||
            searchField.defaultValue
        }
      })
      return searchParams
    },
    currentPageParts() {
      return this.$store.state.coreStore.currentPageParts || {}
    },
    fallbackCenter() {
      var mapMarker = this.$store.state.coreStore.currentAgency
        .agency_map_marker
      return mapMarker ? mapMarker.position : { lat: 15, lng: 15 }
    },
    queryParams() {
      return this.$route.query || {}
    },
    // might stop using above altogether:
    queryParamsJson() {
      let queryParams = this.$route.query || {}
      return JSON.parse(JSON.stringify(queryParams))
    },
    listingsToDisplay() {
      if (this.$store.state.searchStore.propSearchResults) {
        return this.$store.getters.getResalesSearchListings
        // return this.$store.state.searchStore.propSearchResults
      } else {
        return []
      }
    },
    // currentSearchParams() {
    //   if (this.$store.state.currentSearchParams) {
    //     return this.$store.state.currentSearchParams
    //   } else {
    //     return {}
    //   }
    // },
    searchFields() {
      let fieldsCollId =
        this.$store.state.coreStore.currentPage.slug || 'canned_search'
      return this.$store.getters.getSalesSearchFields(fieldsCollId)
    },
    // searchSelectOptions() {
    //   return this.$store.state.searchStore.searchSelectOptions
    // }
  },
}
</script>