<template>
  <v-card
    :id="resCardId"
    @mouseover="carouselTouched"
    hover
    class="wide-property-item"
  >
    <v-layout row wrap class="wide-property-layout">
      <v-flex xl6 lg6 md12 sm12 xs12 pa-0>
        <v-card flat>
          <v-carousel
            v-if="useCarousel"
            hide-delimiters
            class="property-thumb-gallery"
            :cycle="false"
          >
            <v-carousel-item v-for="(pic, i) in propPictures" :key="i">
              <a tag="div" :href="resolvedHref">
                <v-img
                  lazy-src="https://dummyimage.com/370x200/A9A9A9/A9A9A9&text="
                  :src="pic.PictureURL"
                  :alt="pic.PictureCaption"
                  aspect-ratio="1.7778"
                ></v-img>
              </a>
            </v-carousel-item>
          </v-carousel>
          <a v-else tag="div" :href="resolvedHref">
            <v-img
              :lazy-src="propPictures[0].PictureURL"
              :src="propPictures[0].PictureURL"
              :alt="propPictures[0].PictureCaption"
              aspect-ratio="1.7778"
            ></v-img>
          </a>
        </v-card>
      </v-flex>
      <v-flex class="p-row-inner" xl6 lg6 md12 sm12 xs12 pa-0>
        <v-layout
          column
          justify-space-between
          fill-height
          class="wide-property-layout inner-playout"
        >
          <v-card flat class="wide-property-inner-card">
            <v-card-title primary-title class="dv-headline d-inline-block">
              <a tag="div" :href="resolvedHref">
                <h3 class="dv-title d-inline-block">
                  {{ autoTitle }}
                </h3>
                <h4 class="dv-price d-inline-block">
                  <span v-if="isPromotion">{{
                    $ft('client_shared.fieldLabels.from')
                  }}</span>
                  <DisplayResalesPrice
                    :listing="property"
                    :noCents="true"
                  ></DisplayResalesPrice>
                </h4>
              </a>
            </v-card-title>
            <v-card-text class="hidden-lg-and-down">
              <div class="dv-subheading grey--text d-block ellipsis">
                {{ property.Description }}
              </div>
            </v-card-text>
          </v-card>
          <v-card flat class="wide-property-inner-card">
            <v-card-actions class="property-icons">
              <div v-if="property.Bedrooms" class="dv-details dv-left">
                <v-icon class="mr-1">hotel</v-icon>
                {{ property.Bedrooms }}
              </div>
              <div v-if="property.Bathrooms" class="dv-details dv-center mx-3">
                <span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="bath"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="bathroom-svg svg-inline--fa fa-bath fa-w-16"
                  >
                    <path fill="currentColor" class="bathroom-icon" />
                  </svg>
                  {{ property.Bathrooms }}
                </span>
              </div>
              <div v-if="property.Built" class="dv-details dv-right">
                <v-icon class="mr-1">aspect_ratio</v-icon>
                {{ property.Built }}m²
              </div>
            </v-card-actions>
          </v-card>
          <v-card flat class="wide-property-inner-card">
            <v-card-actions class="dv-row-bottom inmo-card bottom-details">
              <v-btn flat class="dv-details dv-left">
                <v-icon class="mr-1" color="#F7A100">place</v-icon>
                {{ property.Location }}
              </v-btn>
              <v-spacer></v-spacer>
              <a tag="div" :href="resolvedHref">
                <v-btn flat class="dv-details dv-right">
                  <v-icon class="mr-1">chevron_right</v-icon>
                  {{ $ft('client_shared.labels.details') }}
                </v-btn>
              </a>
            </v-card-actions>
          </v-card>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
// // import AddToBoosterModal from '@jsroot/shared-admin/components-modals/AddToBoosterModal'
// Would be nice to be able to avoid including the above for non admins
import DisplayResalesPrice from '@/components/general/DisplayResalesPrice'
// import truncate from 'vue-truncate-collapsed'
export default {
  components: {
    // AddToBoosterModal,
    DisplayResalesPrice,
    // truncate
  },
  props: [
    'saleOrRentalCat',
    'offSet',
    'totalCount',
    'property',
    'showTransition',
    'index',
    'useCarousel',
    'removable',
  ],
  data: () => ({
    // images: []
    picsInViewCount: 1,
    // hovered: false,
    // alertsMode: {
    //   type: Boolean,
    //   default: false
    // }
  }),
  watch: {},
  methods: {
    carouselTouched(params) {
      // this.hovered = true
      if (this.picsInViewCount < 2) {
        this.picsInViewCount = 5
      }
    },
  },
  computed: {
    disableTooltip() {
      // disable tooltip if totalCount not available
      return !this.totalCount
    },
    resCardId() {
      let resCardId = 'res-card-' + this.property.Reference
      return resCardId
    },
    resolvedHref() {
      let localeParamObj = {
        locale: this.$store.state.coreStore.currentLocale,
        slugOrId: this.property.Reference,
        preamble: this.$store.getters.listingPreamble,
        prefix: 's',
      }
      let routeName = 'resalesDetails'
      if (this.saleOrRentalCat === 'rentals') {
        routeName = 'resalesRentalDetails'
      }
      var resolvedRouter = this.$router.resolve({
        name: routeName,
        params: localeParamObj,
      })
      return resolvedRouter.href
    },
    isPromotion() {
      let isPromotion = false
      let idKey = 'New Development'
      let idKey2 = 'Off Plan'
      if (this.$route.params.locale === 'es') {
        idKey = 'Promoción'
        idKey2 = 'Pre-construcción'
      }
      // TODO oct 2019 - enable promotion detection for more locales
      let listingCats = this.property.PropertyFeatures
        ? this.property.PropertyFeatures.Category
        : []
      if (Array.isArray(listingCats)) {
        listingCats.forEach(function (listingCat) {
          if (
            listingCat.Value.includes(idKey) ||
            listingCat.Value.includes(idKey2)
          ) {
            isPromotion = true
          }
        })
      } else {
        if (listingCats.Value === idKey || listingCats.Value === idKey2) {
          isPromotion = true
        }
      }
      return isPromotion
    },
    propPictures() {
      if (this.property.Pictures && this.property.Pictures.Picture) {
        return this.property.Pictures.Picture.slice(0, this.picsInViewCount)
      } else if (this.property.MainImage) {
        return [
          {
            PictureCaption: '',
            PictureURL: this.property.MainImage,
          },
        ]
      } else {
        return [
          {
            PictureCaption: '',
            PictureURL: '',
          },
        ]
      }
    },
    autoTitle() {
      if (!this.property.Reference) {
        return ''
      }
      let autoTitle = this.property.Type
      // if (this.$route.params.locale === "es") {
      //   autoTitle += " en venta en "
      // } else {
      //   autoTitle += " for sale in "
      // }
      autoTitle += ' ' + this.$ft('client_shared.core.forSaleIn') + ' '
      autoTitle += this.property.Location
      return autoTitle
    },
  },
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
}
</style>