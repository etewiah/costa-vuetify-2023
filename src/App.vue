<template>
  <v-app
    id="app"
    :class="['main-app-wrap', langClass, $store.state.coreStore.baseCssClass]"
    v-cloak
    light
  >
    <v-main>
      <v-container fluid class="main-app-ct mt-0 pb-0 pl-0 pr-0 pt-0 elevation-0">
        <!-- <MainNav :navLinks="topNavLinks"></MainNav> -->
        <div v-if="showBreadcrumbs" class="container py-3">
          <div class="layout row wrap">
            <div class="flex main-content breadcrumbs-cntnr xs12">
              <v-breadcrumbs :items="breadcrumbItems" divider=">"></v-breadcrumbs>
            </div>
          </div>
        </div>
        <div v-if="$store.state.coreStore.is404">
          <!-- <PageNotFound></PageNotFound> -->
        </div>
        <router-view v-else></router-view>
      </v-container>
    </v-main>
    <v-footer
      v-if="$store.state.coreStore.showBelowFold"
      :fixed="false"
      :absolute="false"
      height="200"
      class="pt-0"
      style="background: transparent;"
    >
      <v-container :fluid="fluid" class="pa-0" light>
        <!-- <PageFooter></PageFooter>
        <ZohoWidget></ZohoWidget> -->
      </v-container>
    </v-footer>
  </v-app>
</template>
<script>
// import MainNav from '@jsroot/theme-marbella/components-nav/MainNav'
// // import PageTopHeader from '@/components-nav/PageTopHeader'
// // import PageFooter from '@jsroot/theme-marbella/components/PageFooter'
// import PageNotFound from '@/components/PageNotFound'
// import ZohoWidget from '@jsroot/theme-marbella/components/ZohoWidget'

export default {
  components: {
    // ZohoWidget,
    // PageNotFound,
    // MainNav,
    // PageFooter: () =>
    //   import(
    //     /* webpackMode: "lazy" */ /* webpackChunkName: "footer" */ '@jsroot/theme-marbella/components/PageFooter'
    //   ),
    // PageTopHeader
  },
  data: function() {
    return {
      // showBelowFold: false,
      fluid: true,
      // clipped: false,
      // drawer: false,
      fixed: false
      // items: [
      //   { icon: 'bubble_chart', title: 'Inspire' }
      // ],
      // miniVariant: false,
      // right: true,
      // rightDrawer: false,
    }
  },
  created() {
    window.addEventListener('scroll', this.onAppScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onAppScroll)
  },
  methods: {
    onAppScroll(e) {
      // if (INMOAPP.env === 'production') {
      //   ;(function(w, d, s, l, i) {
      //     w[l] = w[l] || []
      //     w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
      //     var f = d.getElementsByTagName(s)[0],
      //       j = d.createElement(s),
      //       dl = l != 'dataLayer' ? '&l=' + l : ''
      //     j.async = true
      //     j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
      //     f.parentNode.insertBefore(j, f)
      //   })(window, document, 'script', 'dataLayer', 'GTM-5K7HJ7C')
      // }
      // // this.showBelowFold = true
      // this.$store.commit('enableBelowFold')
      // // could do a window.pageYOffset > 0 check to make sure scroll really has happened
      // window.removeEventListener('scroll', this.onAppScroll)
    }
  },
  computed: {
    showBreadcrumbs() {
      // let breadcrumbsEnabled = JSON.parse(localStorage.getItem("breadcrumbs:enabled"))
      // return breadcrumbsEnabled && (this.breadcrumbItems.length > 1)
      return this.breadcrumbItems.length > 1
    },
    breadcrumbItems() {
      return this.$store.state.utilitiesStore.breadcrumbItems
      // return this.$store.getters.breadcrumbItems('viewing-trip')
    },

    langClass() {
      let locale =
        this.$i18n.locale || this.$store.state.coreStore.currentLocale
      return 'lang-' + locale
    },
    topNavLinks() {
      return this.$store.getters.getTopNavLinks()
    }
  },
  mounted: function() {
    let noscriptEl = document.querySelector('noscript')
    let noScriptFrag = document
      .createRange()
      .createContextualFragment(noscriptEl.innerText)
    // normally can't access dom in noscript tags. Above gets around that
    this.$store.commit('setPreRenderedFrag', { preRenderedFrag: noScriptFrag })

    // this.$store.commit('set404', { is404: INMOAPP.clientSettings.is_404 })
    // this.$store.commit('setCookieStatus')
    this.$store.dispatch('loadSettings')
  },
  beforeCreate: function() {
    //     let locale =
    // INMOAPP.clientSettings.display_settings.cl_locale || "en"
    // Jan 2020 - todo - Use above instead of below
    let locale =
      document.location.pathname.split('/')[1] ||
      this.$store.state.coreStore.currentLocale
    this.$store.commit('setCurrentLocale', locale)
  },
  watch: {
    '$store.state.coreStore.i18nMessages': {
      handler(newVal, oldVal) {
        var locale =
          this.$route.params['locale'] ||
          this.$store.state.coreStore.currentLocale
        this.$i18n.locale = locale
        this.$i18n.setLocaleMessage(locale, newVal)
      }
      // deep: true
    }
  }
}
</script>
<style>
[v-cloak] {
  display: none;
}

.main-app-wrap {
  /*background-color: #f7f7f7;*/
  background-color: #f7f8fa;
}

/*p {
  font-size: 2em;
  text-align: center;
}*/
</style>