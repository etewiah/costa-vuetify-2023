<template>
  <span>
    <v-list-tile class="ctd_idio_list_tile">
      <v-list-tile-title class="ctd_idio_list_tile_title" flat>
        <div v-if="dispLangSwitcher" class="contenedor_idiomas">
          <ul class="idiomas idiomas_mobile_menu">
            <template v-if="useLocaleUrls">
              <template v-for="locale in expLocales">
                <li :key="locale.variant" :class="[locale.selected]">
                  <a
                    @click="switchLocaleAndRoute(locale, localeUrls[locale.shortLocale])"
                    :class="[locale.variant, locale.selected]"
                    :title="locale.variant"
                  ></a>
                </li>
              </template>
            </template>
            <template v-else v-for="locale in expLocales">
              <li :key="locale.variant" :class="[locale.selected]">
                <a @click="switchLocaleAndRoute(locale)" :class="[locale.variant, locale.selected]"></a>
              </li>
            </template>
          </ul>
        </div>
      </v-list-tile-title>
    </v-list-tile>
    <v-divider></v-divider>
  </span>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    // certain routes will set localeUrls object on vuex store
    // This is preferable
    useLocaleUrls: function() {
      // console.log(this.$route.name)
      // if (["propRentalDetailsEdit", "editBlogText"].includes(this.$route.name)) {
      // Would prefer not to rely on edit routes containing
      // the text "edit"
      if (this.$route.path.toLowerCase().includes('edit')) {
        // if (this.$route.name.includes("edit")) {
        return false
      } else {
        return this.$store.state.localeUrls
      }
    },
    localeUrls: function() {
      return this.$store.state.localeUrls
    },
    dispLangSwitcher: function() {
      if (this.expLocales.length > 1) {
        return true
      } else {
        return false
      }
    },
    // TODO - perhaps calculate below in a vuex getter
    expLocales: function() {
      let locales =
        this.$store.state.coreStore.displaySettings.supported_locales || []
      let expLocales = []
      let currentLocale = this.$store.state.coreStore.currentLocale
      // Pepe requested ability to navigate to root url
      // without "/:locale" so below will not always be valid
      // this.$route.params["locale"]
      locales.forEach(function(locale) {
        let selected = ''
        // locales are saved like so en-GB
        // The second part is used for the class
        // so I can use different flag icons for
        // different countries
        let localeAndVar = locale.split('-')
        let variant = localeAndVar[1] || localeAndVar[0]
        if (localeAndVar[0] === currentLocale) {
          selected = 'selected'
        }
        expLocales.push({
          shortLocale: localeAndVar[0],
          variant: variant.toLowerCase(),
          selected: selected
        })
      })
      return expLocales
    }
  },
  methods: {
    // switchLocale(locale) {
    //   this.$store.commit('setCurrentLocale', locale.shortLocale)
    //   // below needed to get new translations from server
    //   this.$store.dispatch('loadSettings')
    // },
    // Oct 2019 - previously was using a routerlink
    // when useLocaleUrls was true but that led to the
    // wrong locale being passed to API when trying
    // to retrieved a different standard page
    // NB - implemented this a while back on desktop lang switcher but forgot about this
    switchLocaleAndRoute(locale, path) {
      // console.log(this.$route)
      var params = this.$route.params
      // params["locale"] = locale.shortLocale
      // doing above and pushing that to the router
      // would mean from and to in my route watch
      // would be the same
      var newParams = {
        locale: locale.shortLocale
      }
      this.$store.commit('setCurrentLocale', locale.shortLocale)
      // below needed to get new translations from server
      // this.$store.dispatch('loadSettings')
      let routeParams = {}
      if (path) {
        routeParams = {
          path: path,
          query: this.$route.query
        }
        // this.$router.replace(routeParams)
        // above just works a bit differently with browser history
        // this.$router.push(routeParams)
        // tried both options below but resulted in double page transition
        // location.reload()
        // this.$router.go()
      } else {
        var routeName = this.$route.name
        if (this.$store.state.coreStore.is404) {
          // for 404 pages go to homepage on attempt to switch lang
          routeName = 'HomePage'
        }
        routeParams = { name: routeName, params: newParams }
      }
      var resolvedRouter = this.$router.resolve(routeParams)
      var newUrl = resolvedRouter.href
      window.location.href = newUrl
      // window.location.reload()
    }
  }
}
</script>
<style scoped>
ul.idiomas li.selected,
ul.idiomas li:hover {
  background: url('~@/assets/images/simple-nav-arrow.png') no-repeat top;
}

.ctd_idio_list_tile_title {
  height: 100%;
}

.idiomas_mobile_menu {
  position: relative;
  /* left: -35%;
  float: right; */
  background-color: #fff;
}

ul.idiomas li {
  float: left;
  list-style: none outside none;
  margin: 0 20px 0 5px;
  padding: 11px 0 0 0;
  width: 20px;
}

ul.idiomas li a {
  display: block;
  width: 20px;
  height: 14px;
  outline: 1px solid #555;
  margin: 0;
}

ul.idiomas .nl {
  background: url('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/nl.svg')
    no-repeat;
  background-size: cover;
}

ul.idiomas .it {
  background: url('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/it.svg')
    no-repeat;
  background-size: cover;
}

ul.idiomas .es {
  background: url('~@/assets/images/idiomas.png') 0 0 no-repeat;
}

ul.idiomas .en,
ul.idiomas .uk {
  background: url(~@/assets/images/idiomas.png) -20px 0;
}

ul.idiomas .ru {
  background: url('~@/assets/images/idiomas.png') -40px 0;
}

ul.idiomas .sv {
  background: url('~@/assets/images/idiomas.png') -60px 0;
}

ul.idiomas .no {
  background: url('~@/assets/images/idiomas.png') -80px 0;
}

ul.idiomas .de {
  background: url('~@/assets/images/idiomas.png') -100px 0;
}

ul.idiomas .fr {
  background: url('~@/assets/images/idiomas.png') -120px 0;
}

ul.idiomas .ne {
  background: url('~@/assets/images/idiomas.png') -140px 0;
}

ul.idiomas .ch {
  background: url('~@/assets/images/idiomas.png') -160px 0;
}

ul.idiomas .fi {
  background: url('~@/assets/images/idiomas.png') -180px 0;
}

ul.idiomas .eu {
  background: url('~@/assets/images/idiomas.png') -200px 0;
}

ul.idiomas .pt {
  background: url('~@/assets/images/idiomas.png') -220px 0;
}

ul.idiomas .ar {
  background: url('~@/assets/images/idiomas.png') -240px 0;
}

ul.idiomas .ca {
  background: url('~@/assets/images/idiomas.png') -260px 0;
}

ul.idiomas .br {
  background: url('https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/br.svg')
    no-repeat;
  background-size: cover;
}
</style>