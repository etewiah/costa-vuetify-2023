<template>
  <v-menu v-if="dispLangSwitcher" open-on-hover close-delay="100" class="dd-idiomas" offset-y>
    <v-btn slot="activator" outline small class="language-button">
      <v-avatar size="25" class="mr-1">
        <img :src="currentLocaleDetails.icon" alt="US FLAG" />
      </v-avatar>
      <span class="ma-0" outline>{{currentLocaleDetails.shortLocale}}</span>
      <v-icon class="ma-0" right>expand_more</v-icon>
    </v-btn>
    <v-list v-if="useLocaleUrls">
      <v-list-tile v-for="(locale, index) in expLocales" :key="index" class="locale-option">
        <v-list-tile-title class="dd-idiomas-title">
          <a
            @click="switchLocaleAndRoute(locale, localeUrls[locale.shortLocale])"
            :class="[locale.variant, locale.selected]"
          >
            <v-avatar size="25" class="mr-1">
              <img :src="locale.icon" alt="Language FLAG" />
            </v-avatar>
            {{locale.text}}
          </a>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-list v-else>
      <v-list-tile
        v-for="(locale, index) in expLocales"
        :key="index"
        @click="switchLocaleAndRoute(locale)"
      >
        <v-list-tile-title class="dd-idiomas-title">
          <span  :class="[locale.variant, locale.selected]">
            <v-avatar size="25" class="mr-1">
              <img :src="locale.icon" alt="Language FLAG" />
            </v-avatar>
            {{locale.text}}
            <!--             <span style="margin-left: 5px;" :class="[locale.shortLocale, 'current-locale-flag']"></span>
            {{locale.shortLocale}}
            -->
          </span>
        </v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
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
      // // Would prefer not to rely on edit routes containing
      // // the text "edit"
      // if (this.$route.path.toLowerCase().includes("edit")) {
      //   // if (this.$route.name.includes("edit")) {
      //   return false
      // } else {
      //   return this.$store.state.localeUrls
      // }
      // June 2019 - I'm now obliged to set editpage urls
      // using         this.$store.commit('setLocaleUrls', { result: localeUrls })
      // Can get rid of useLocaleUrls altogether..
      return this.$store.state.localeUrls
    },
    localeUrls: function() {
      return this.$store.state.localeUrls
    },
    dispLangSwitcher: function() {
      if (this.expLocales.length > 0) {
        return true
      } else {
        return false
      }
    },
    currentLocaleDetails: function() {
      var iconPath =
        'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/'
      var localeDetails = {
        icon: '/assets/images/gb.png'
      }
      // if (this.$store.state.coreStore.currentLocale === 'es') {
      //   localeDetails = {
      //     icon: '/assets/images/es.png',
      //   }
      // }
      switch (this.$store.state.coreStore.currentLocale) {
        case 'es':
          localeDetails.icon = iconPath + 'es.svg'
          break
        case 'it':
          localeDetails.icon = iconPath + 'it.svg'
          break
        case 'fr':
          localeDetails.icon = iconPath + 'fr.svg'
          break
        case 'nl':
          localeDetails.icon = iconPath + 'nl.svg'
          break
      }
      localeDetails.shortLocale = this.$store.state.coreStore.currentLocale
      return localeDetails
    },
    // expandedLocales
    expLocales: function() {
      let locales =
        this.$store.state.coreStore.displaySettings.supported_locales || []
      let expLocales = []
      let currentLocale = this.$store.state.coreStore.currentLocale
      // Pepe requested ability to navigate to root url
      // without "/:locale" so below will not always be valid
      // this.$route.params["locale"]
      locales.forEach(function(locale) {
        // let selected = ""
        // locales are saved like so en-GB
        // The second part is used for the class
        // so I can use different flag icons for
        // different countries
        var localeAndVar = locale.split('-')
        var shortLocale = localeAndVar[0].toLowerCase()
        var variant = localeAndVar[1] || localeAndVar[0]
        if (shortLocale !== currentLocale) {
          var localeDetails = {
            icon: '/assets/images/gb.png',
            text: 'English'
          }
          var iconPath =
            'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/0.8.2/flags/4x3/'
          // TODO - use less verbose code here:
          // console.log('locale is')
          // console.log(shortLocale)
          switch (shortLocale) {
            case 'es':
              localeDetails.icon = iconPath + 'es.svg'
              localeDetails.text = 'Español'
              break
            case 'it':
              localeDetails.icon = iconPath + 'it.svg'
              localeDetails.text = 'Italiano'
              break
            case 'fr':
              localeDetails.icon = iconPath + 'fr.svg'
              localeDetails.text = 'Français'
              break
            case 'nl':
              localeDetails.icon = iconPath + 'nl.svg'
              localeDetails.text = 'Nederlands'
              break
          }
          // if (localeAndVar[0] === 'es') {
          //   localeDetails = {
          //     icon: '/assets/images/es.png',
          //     text: 'Español'
          //   }
          // }
          localeDetails.shortLocale = shortLocale
          localeDetails.variant = variant.toLowerCase()
          expLocales.push(localeDetails)
        }
      })
      // console.log(expLocales)
      return expLocales
    }
  },
  methods: {
    //
    // switchLocale(locale) {
    //   this.$store.commit('setCurrentLocale', locale.shortLocale)
    //   // below needed to get new translations from server
    //   this.$store.dispatch('loadSettings')
    // },
    // July 2019 - previously was using a routerlink
    // when useLocaleUrls was true but that led to the
    // wrong locale being passed to API when trying
    // to retrieved a different standard page
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
<style>
.v-menu__activator--active .v-icon {
  visibility: hidden;
}

.current-locale-flag {
  /*background: url(~@/assets/images/idiomas.png) -20px 0;*/
  display: block;
  width: 20px;
  height: 14px;
  outline: 1px solid #555;
  margin: 4px 7px 5px -5px;
  float: left;
}

.current-locale-flag.es {
  background: url('~@/assets/images/idiomas.png') 0 0 no-repeat;
}

.current-locale-flag.en,
.current-locale-flag.uk {
  background: url(~@/assets/images/idiomas.png) -20px 0;
}

.dd-idiomas-title {
  /*text-transform: uppercase;*/
}

.dd-idiomas-btn {
  border: solid 1px;
  padding: 0 0px;
}

.dd-idiomas-title a {
  color: black;
  text-decoration: none;
}
</style>