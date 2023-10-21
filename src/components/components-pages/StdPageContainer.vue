<template>
  <div>
    <!-- do I need keep-alive component here.... -->
    <component :is="pageLayout"></component>
    <!-- TODO - display properties etc here -->
  </div>
</template>
<script>
//TODO - figure out some way of only including the correct components:
// import defaultPageLayout from '@/components/layouts/defaultPageLayout'
// import pageWithFormLayout from '@/components/layouts/pageWithFormLayout'
// import contactUsLayoutBv from '@/components/layouts/contactUsLayoutBv'
// import aboutUsLayoutBv from '@/components/layouts/aboutUsLayoutBv'
// import ourServicesLayoutBv from '@/components/layouts/ourServicesLayoutBv'
// import servicePageLayoutBv from '@/components/layouts/servicePageLayoutBv'
// import siteMapLayoutBv from '@/components/layouts/siteMapLayoutBv'
// Oct 2019 - not sure testimonials layout is in use
// import testimonialsLayoutBv from '@/components/layouts/testimonialsLayoutBv'
export default {
  metaInfo() {
    return {
      // title: this.$store.state.coreStore.currentPage.page_title,
      // nov - above is now reserved for where the template includes a title
      title:
        this.$store.state.coreStore.currentPage.title_meta || 'Costa Specialist'
      // TODO - have a site-wide fallback title
    }
  },
  components: {
    // // testimonialsLayoutBv,
    // siteMapLayoutBv,
    // servicePageLayoutBv,
    // ourServicesLayoutBv,
    // aboutUsLayoutBv,
    // contactUsLayoutBv,
    // defaultPageLayout,
    // pageWithFormLayout
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.$store.commit('setPageContent', { result: {} })
  //   next()
  // },
  // May 2019 - above does not trigger on the initial page load while
  // the route watch does not
  // This is not a problem with property details pages as only they
  // can load a property.  With pages though some other route
  // can load a page which needs to be cleared before entering this route

  // below to stop previous page
  // flashing up briefly before disappearing
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setPageContent', { result: {} })
    next()
  },
  watch: {
    $route: {
      handler(to, from) {
        this.$store.commit('setRouteLoading', { isRouteLoading: true })
        this.$store.commit('setPageContent', { result: {} })
        this.$store.dispatch('loadStdPage', to.params.pageName)
      },
      immediate: true
    },
    '$store.state.coreStore.currentPage'(newVal) {
      this.$store.commit('setRouteLoading', { isRouteLoading: false })
      // var localeUrls = newVal.urls
      // this.$store.commit('setLocaleUrls', { result: localeUrls })
      let extraCrumbs = []
      let crumbTitle = this.$store.state.coreStore.currentPage.title_meta
      if (crumbTitle) {
        // let searchLabel =
        // this.$store.getters.getI18nS("labels.search")
        //
        let propLocSearchCrumb = {
          text: this.searchLabel,
          disabled: false,
          to: {
            name: 'resalesSearch',
            query: {},
            params: {
              locale: this.$store.state.coreStore.currentLocale,
              preamble: this.$store.getters.listingPreamble
            }
          }
        }
        extraCrumbs.push(propLocSearchCrumb)

        extraCrumbs.push({
          text: crumbTitle,
          disabled: true
        })
      }

      this.$store.commit('setPropCrumbs', {
        extraCrumbs: extraCrumbs,
        locale: this.$store.state.coreStore.currentLocale
      })
    }
  },
  computed: {
    searchLabel() {
      return this.$ft("client_shared.labels.search")
      // Above needed as
      // translations aren't ready in time to be used here :(
      // return this.$i18n.t("client_shared.labels.search")
      // return this.$store.getters.getI18nS("labels.search")
    },
    pageLayout() {
      return (
        this.$store.state.coreStore.currentPage.current_vue_layout ||
        'defaultPageLayout'
      )
    }
  }
}
</script>
<style scoped>
</style>