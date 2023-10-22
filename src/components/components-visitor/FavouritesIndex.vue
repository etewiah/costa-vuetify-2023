<template>
  <span>
    <v-container pa-0>
      <v-layout class="mb-0" row wrap>
        <!--         <v-flex xl6 md6 xs6 pt-4 class="">
          <v-switch @change="favEnabledChange" v-model="favouritesEnabled" :label="`FavouritesEnabled: ${favouritesEnabled.toString()}`"></v-switch>
        </v-flex>
        -->
        <v-flex xl12 md12 xs12 pt-4 class>
          <div class="favourites-container">
            <v-card class="mb-4 inmo-card px-3" left>
              <v-card-text>
                <div v-html="$store.state.coreStore.currentPage['raw_html']"></div>
              </v-card-text>
              <v-layout class="pb-3" row wrap>
                <v-flex xs12 sm6 md4>
                  <v-btn
                    color="#F7A100"
                    :href="printUrl"
                    target="_blank"
                    class="white--text printbutton title-details m-printer"
                  >
                    {{$ft("client_shared.labels.printFavs") }}
                    <v-icon right dark>print</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-btn
                    color="#F7A100"
                    @click="clearAllFavs"
                    class="white--text printbutton title-details m-printer"
                  >
                    {{$ft("client_shared.labels.removeFavs") }}
                    <v-icon right dark>clear</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-xl px-0>
      <v-layout row wrap>
        <v-flex
          xs12
          sm12
          md6
          lg4
          xl4
          v-for="(property, index) in savedFavourites"
          :key="property.Reference"
        >
          <ResalesRowItem
            :removable="true"
            @removeAction="removeAction"
            :useCarousel="true"
            :property="property"
            :index="index"
          ></ResalesRowItem>
        </v-flex>
        <v-flex xl12 md12 xs12 pt-4 class></v-flex>
      </v-layout>
      <v-layout v-if="savedFavourites.length > 0">
        <v-flex xs12></v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card class="inmo-card pa-5 mt-4">
            <v-form ref="form" class lazy-validation>
              <v-layout row wrap>
                <v-flex lg3 md12 sm12 xs12>
                  <v-card class="mb-5 px-4 py-3 text-xs-center">
                    <v-img
                      src="https://res.cloudinary.com/inmo-design/image/upload/v1560439674/logo-contact-form_cdjbx1.svg"
style="display:none"                      contain
                      aspect-ratio="1"
                      width="175"
                      class="logo-contact-bottom"
                    ></v-img>
                    <v-card-title primary-title>
                      <span class="headline span-center details-title">Costa Specialist</span>
                    </v-card-title>
                    <v-card-text>
                      <p>
                        Avenida Carmen Saenz de Tejada, S/N, Edificio S208, Planta 1,
                        Local 5A, 29651 Mijas
                        Costa (Málaga)
                      </p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn outline block large color="#F7A100" dark>
                        <v-icon>phone</v-icon>
                        <a href="tel:+34 951 484 500">+34 951 484 500</a>
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                      <v-btn flat small color="#F7A100">{{ $ft("client_shared.labels.mailUs") }}</v-btn>|
                      <v-btn
                        flat
                        small
                        color="#F7A100"
                        href="mailto:info@costaspecialist.com"
                      >info@costaspecialist.com</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex lg9 md12 sm12 xs12>
                  <InmoWideEnquiryForm
                    :alertDetails="alertDetails"
                    listingModelName="resales_listing"
                    :hideAlertPrompt="true"
                    messagePlaceHolderTkey="client_shared.forms.favsFormMessage"
                  ></InmoWideEnquiryForm>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </span>
</template>
<script>
import ResalesRowItem from '@/components/components-resales/ResalesRowItemCosta'
import InmoWideEnquiryForm from '@/components/components-forms/InmoWideEnquiryForm'
import { remove } from 'lodash'

export default {
  components: {
    InmoWideEnquiryForm,
    ResalesRowItem
  },
  // metaInfo() {},
  watch: {
    '$store.state.coreStore.i18nMessages': {
      handler(newVal, oldVal) {
        this.updateCrumbs()
      }
    },
    $route: {
      handler(to, from) {
        // this.$store.commit('setRouteLoading', { isRouteLoading: true })
        // this.$store.commit('setPageContent', { result: {} })
        this.$store.dispatch('loadStdPage', 'fav_index')
        this.updateCrumbs()
      },
      immediate: true
    }
  },
  mounted: function() {
    // JSON parsing string "true" will return boolean true
    // this.favouritesEnabled = JSON.parse(localStorage.getItem("favs:enabled")) || false
    // this.breadcrumbsEnabled = JSON.parse(localStorage.getItem("breadcrumbs:enabled")) || false

    let resalesFavsKey = 'favs:resale'
    this.savedFavourites =
      JSON.parse(localStorage.getItem(resalesFavsKey)) || []
  },
  data: () => ({
    favouritesEnabled: false,
    // breadcrumbsEnabled: false,
    savedFavourites: []
  }),
  methods: {
    updateCrumbs() {
      let extraCrumbs = []
      let crumbTitle = this.$ft('client_shared.labels.favs')
      if (crumbTitle) {
        extraCrumbs.push({
          text: crumbTitle,
          disabled: true
        })
      }
      this.$store.commit('setPropCrumbs', {
        extraCrumbs: extraCrumbs,
        locale: this.$store.state.coreStore.currentLocale
      })
    },
    removeAction(property) {
      let resalesFavsKey = 'favs:resale'
      let savedFavourites = JSON.parse(localStorage.getItem(resalesFavsKey))
      // remove from lodash
      remove(savedFavourites, function(n) {
        return n.Reference === property.Reference
      })
      localStorage.setItem(resalesFavsKey, JSON.stringify(savedFavourites))
      this.savedFavourites = savedFavourites
      let updateParams = {
        propDetails: property,
        action: 'archive'
      }
      this.$store.dispatch('updateFavourites', updateParams)
    },
    bcEnabledChange(status) {
      localStorage.setItem('breadcrumbs:enabled', status)
    },
    clearAllFavs(status) {
      // localStorage.setItem("favs:enabled", status)
      let savedFavourites = []
      let resalesFavsKey = 'favs:resale'
      localStorage.setItem(resalesFavsKey, JSON.stringify(savedFavourites))
      this.savedFavourites = savedFavourites
    }
  },
  computed: {
    alertDetails() {
      // If form submitted, will be used
      // by zoho to send alerts
      // let resalesFavsRefs = []
      // this.savedFavourites.forEach(function(fav){
      //   resalesFavsRefs.push(fav.Reference)
      // })
      let alertDetails = {
        resalesFavsRefs: this.savedFavsRefs
      }
      return alertDetails
    },
    printUrl() {
      let printUrl = 'https://costa-print.inmo.cloud/multiple.php?language='
      printUrl += this.$store.state.coreStore.currentLocale
      printUrl += '&reference=' + this.savedFavsRefs
      return printUrl
    },
    savedFavsRefs() {
      let savedFavsRefs = ''
      this.savedFavourites.forEach(function(fav) {
        savedFavsRefs += fav.Reference + ','
      })
      return savedFavsRefs
    }
  }
}
</script>
<style>
</style>