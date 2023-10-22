<template>
  <div>
    <MoreInfoModal
      @hideCurrentModal="hideCallbackModal"
      :currentModalVisible="callbackModalVisible"
      :alertDetails="alertDetails"
      :currentProperty="currentProperty"
    ></MoreInfoModal>
    <v-container
      :class="['resales-listing', promotionClass]"
      white
      fluid
      grid-list-xl
      justify-center
      align-content-center
      slider-row
    >
      <v-layout class="mb-3" blog-row row wrap>
        <!-- Single Property -->
        <v-flex xl12 lg12 md12 sm12 xs12 slider-container>
          <v-container grid-list-xl pa-0 pb-4>
            <v-layout row wrap>
              <!-- Main Property Results -->
              <v-flex xs12 class="main-content">
                <div class="main-listing-title">
                  <span class="display-1">{{ autoTitle }}</span>
                </div>
                <div class="main-header-label">
                  <span class="title-details">
                    <v-icon class="mr-1">hotel</v-icon>
                    {{ currentProperty.Bedrooms }}
                  </span>
                  <span class="title-details">
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
                    {{ currentProperty.Bathrooms }}
                  </span>
                  <span class="title-details">
                    <v-icon class="mr-1">aspect_ratio</v-icon>
                    {{ currentProperty.Built }}m²
                  </span>
                  <span class="title-details r-price-details">
                    <!--                   <v-icon class="mr-1" style="display: none;">euro_symbol</v-icon>
                  -->
                    <span v-if="isPromotion">{{
                      $ft('client_shared.fieldLabels.from')
                    }}</span>
                    <DisplayResalesPrice
                      :listing="currentProperty"
                      :noCents="true"
                    ></DisplayResalesPrice>
                  </span>
                  <v-btn
                    color="#F7A100"
                    :href="printUrl"
                    target="_blank"
                    class="white--text printbutton title-details t-right"
                  >
                    {{ $ft('client_shared.labels.print') }}
                    <v-icon right dark>print</v-icon>
                  </v-btn>
                  <v-btn
                    color="#F7A100"
                    @click="goToFavourites"
                    v-if="favourited"
                    class="white--text favebutton title-details t-right fav"
                  >
                    {{ $ft('client_shared.core.saved') }}
                    <v-icon right dark>star</v-icon>
                  </v-btn>
                  <!-- If the property is not saved -->
                  <v-btn
                    @click="addToFavourites"
                    color="#F7A100"
                    v-else
                    class="white--text favebutton title-details t-right fav"
                  >
                    {{ $ft('client_shared.core.save') }}
                    <v-icon right dark>star_border</v-icon>
                  </v-btn>
                </div>
                <!--              <v-btn @click="addToFavourites" v-if="favouritesEnabled" style="" text class="mr-3 request-callback bg-screen">
                  <v-icon right class="outlined">favorite_border</v-icon>
                </v-btn>-->
              </v-flex>
            </v-layout>
          </v-container>
          <!-- Image Property Slider -->
          <swiper
            @touchStart="sliderActivated"
            :options="swiperOptionTop"
            class="gallery-top"
            id="prop-slider"
            ref="swiperTop"
          >
            <swiper-slide v-for="(image, index) in lightboxImages" :key="index">
              <v-img :src="image.src" aspect-ratio="1.65"></v-img>
            </swiper-slide>
            <div
              class="swiper-button-prev swiper-button-white"
              slot="button-prev"
            ></div>
            <div
              v-show="isNotLastTopImage"
              class="swiper-button-next swiper-button-white"
              slot="button-next"
            ></div>
          </swiper>
        </v-flex>
        <!-- <v-flex xl3 lg3 md12 sm12 xs12 hidden-md-and-down form-container>
        </v-flex> -->
        <v-flex xs12 class="hidden-sm-and-down">
          <swiper
            @touchStart="sliderActivated"
            @init="onThumbSliderInit"
            :options="swiperOptionThumbs"
            class="gallery-top"
            ref="swiperThumbs"
          >
            <swiper-slide v-for="(image, index) in lightboxImages" :key="index">
              <v-img :src="image.src" aspect-ratio="1.7778"></v-img>
            </swiper-slide>
            <div
              class="swiper-button-next swiper-button-white"
              slot="button-next"
            ></div>
            <div
              class="swiper-button-prev swiper-button-white"
              slot="button-prev"
            ></div>
          </swiper>
        </v-flex>
        <v-flex class="hidden-sm-and-up" pt-2 pb-0 xs12>
          <v-btn
            class="more-filters-button white--text"
            large
            depressed
            block
            color="#F7A100"
            @click="showReqInfo()"
            >{{ $ft('client_shared.forms.reqInfo') }}</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>
    <section>
      <v-container class="pa-0" grid-list-xl>
        <v-layout row wrap justify-center class="my-0">
          <v-flex class="xl8 md8 sm7 xs12">
            <v-card class="inmo-card px-1 py-5 mb-5">
              <v-card-title primary-title>
                <span class="headline">{{
                  $ft('client_shared.fieldLabels.description')
                }}</span>
              </v-card-title>
              <v-card-text>
                <div :class="['pt-1', 'read-more-description', expandClass]">
                  <span v-html="autoDesc"></span>
                </div>
                <v-flex v-if="showMoreBtnVisible" pt-2 pb-0 xs12>
                  <v-btn
                    class="more-filters-button white--text"
                    large
                    depressed
                    block
                    color="#F7A100"
                    @click="toggleFilters()"
                    >{{ moreFiltersText }}</v-btn
                  >
                </v-flex>
              </v-card-text>
              <v-card-actions></v-card-actions>
            </v-card>
            <ListingDetailsTable
              :hideBottom="true"
              :isPromotion="isPromotion"
              :currentProperty="currentProperty"
            ></ListingDetailsTable>
            <ListingDetailsTable
              :hideTop="true"
              :isPromotion="isPromotion"
              :currentProperty="currentProperty"
            ></ListingDetailsTable>
            <!-- <v-card class="inmo-card px-0 py-3">
              <v-card-title primary-title class="pl-5">
                <span class="headline">{{
                  $ft('client_shared.labels.propertyLocation')
                }}</span>
              </v-card-title>
              <MapIframe
                v-if="currentProperty.Location"
                :location="currentProperty.Location"
              ></MapIframe>
            </v-card> -->
          </v-flex>
          <v-flex v-if="showMiddlingContent" xl4 md4 sm5 xs12>
            <v-card class="mb-5 px-3 py-3 inmo-card" id="prop-contact">
              <div>
                <v-card-title primary-title>
                  <span class="headline span-center details-title"
                    >Costa Specialist</span
                  >
                </v-card-title>
                <v-card-text>
                  <p>{{ $ft('client_shared.forms.intInProp') }}</p>
                </v-card-text>
              </div>
              <NarrowEnquiryForm
                :alertDetails="alertDetails"
                :propId="currentProperty.Reference"
                listingModelName="resales_listing"
              ></NarrowEnquiryForm>
            </v-card>
          </v-flex>
          <v-flex justify-center xs12></v-flex>
          <template v-if="sharedContent">
            <v-flex pb-4 justify-center xs12>
              <span v-html="sharedContent"></span>
            </v-flex>
          </template>
        </v-layout>
      </v-container>
      <v-container fluid class="pa-0"></v-container>
    </section>
    <v-container v-if="showMiddlingContent" grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card v-if="similarProps.length > 0" class="inmo-card px-4 py-4">
            <v-card-title primary-title>
              <span class="headline">{{
                $ft('client_shared.fieldLabels.similarProps')
              }}</span>
            </v-card-title>
            <SimilarPropsResults
              :propertiesToDisplay="similarProps"
              saleOrRentalCat="sale"
            ></SimilarPropsResults>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card class="inmo-card pa-5 mt-4">
            <v-form ref="form" class lazy-validation>
              <v-layout row wrap>
                <v-flex lg3 md12 sm12 xs12>
                  <v-card
                    class="mb-5 px-4 py-3 text-xs-center"
                    style="height: 100%"
                  >
                    <!-- <v-img
                      src="~@jsroot/images/costasp/CS LOGO square oranje.jpeg"
                      contain
                      aspect-ratio="1"
                      width="175"
                      class="logo-contact-bottom"
                    ></v-img> -->
                    <v-card-title primary-title>
                      <span class="headline span-center details-title"
                        >Costa Specialist</span
                      >
                    </v-card-title>
                    <v-card-text>
                      <p>
                        Avenida Carmen Saenz de Tejada, S/N, Edificio S208,
                        Planta 1, Local 5A, 29651 Mijas Costa (Málaga)
                      </p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn outlined block large color="#F7A100" dark>
                        <v-icon>phone</v-icon>
                        <a href="tel:+34 951 484 500">+34 951 484 500</a>
                      </v-btn>
                    </v-card-actions>
                    <v-card-actions>
                      <v-btn text small color="#F7A100">{{
                        $ft('client_shared.labels.mailUs')
                      }}</v-btn
                      >|
                      <v-btn
                        text
                        small
                        color="#F7A100"
                        href="mailto:info@costaspecialist.com"
                        >info@costaspecialist.com</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-flex>
                <v-flex lg9 md12 sm12 xs12>
                  <WideEnquiryForm
                    :alertDetails="alertDetails"
                    :propId="currentProperty.Reference"
                    listingModelName="resales_listing"
                    messagePlaceHolderTkey="client_shared.forms.iAmInterested"
                  ></WideEnquiryForm>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="noticeSnackbar.isActive"
      :top="noticeSnackbar.top"
      :color="noticeSnackbar.color"
      :multi-line="noticeSnackbar.mode === 'multi-line'"
      :timeout="noticeSnackbar.timeout"
      :vertical="noticeSnackbar.mode === 'vertical'"
    >
      <span>
        {{ $ft('client_shared.core.saved') }}. &nbsp;&nbsp;
        <router-link class="maincolor" :to="$store.getters.favouritesPage">{{
          $ft('client_shared.labels.viewFavs')
        }}</router-link>
      </span>
      <v-btn dark text @click="noticeSnackbar.isActive = false">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
// import MapIframe from '@/components/components/MapIframe'
// import PropertySharedLinks from '@jsroot/theme-marbella/components-prop/PropertySharedLinks'
import ListingDetailsTable from '@/components/components-resales/ListingDetailsTable'
import DisplayResalesPrice from '@/components/general/DisplayResalesPrice'
import SimilarPropsResults from '@/components/components-resales/SimilarPropsResultsCostaVertical'
import WideEnquiryForm from '@/components/components-forms/InmoWideEnquiryForm'
import NarrowEnquiryForm from '@/components/components-forms/InmoNarrowEnquiryForm'
import MoreInfoModal from '@/components/components-forms/MoreInfoModal'

import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { uniqBy } from 'lodash'
export default {
  components: {
    MoreInfoModal,
    WideEnquiryForm,
    NarrowEnquiryForm,
    swiper,
    swiperSlide,
    SimilarPropsResults,
    ListingDetailsTable,
    // MapIframe,
    // PropertySharedLinks,
    DisplayResalesPrice,
  },
  props: ['currentProperty', 'similarProps', 'autoDesc'],
  mounted() {
    // this.$nextTick(() => {
    const swiperTop = this.$refs.swiperTop.swiper
    const swiperThumbs = this.$refs.swiperThumbs.swiper
    // below is to make the 2 sliders work in unison
    // swiperTop.init()
    // swiperThumbs.init()
    // this.countImagesToShow = 6
    // swiperThumbs.activeIndex = 2
    // swiperThumbs.slideTo(4)
    // swiperThumbs.slideTo(3, 1000, false)
    // swiperThumbs.update()
    // this.$refs.swiperTop.swiper.activeIndex = this.$refs.swiperThumbs.swiper.activeIndex
    swiperTop.controller.control = swiperThumbs
    this.swiperThumbs.controller.control = swiperTop
    // })
    // setTimeout(() => {
    //   // Only way I can prevent bug with last thumbnails
    //   // not showing in main frame is to set
    //   // centeredSlides to true - below is to ensure 1st 2 spaces are not blank on load
    //   this.swiperThumbs.slideTo(2, 100, false)
    // }, 1000)
    var that = this
    swiperTop.on('slideChange', function (evt, details) {
      var stp = that.$refs.swiperTop.swiper
      // console.log(stp.activeIndex)
      // console.log(that.lightboxImages.length - 6)
      if (stp.activeIndex > that.lightboxImages.length - 6) {
        if (stp.activeIndex > 1) {
          // This is a workaround for bizarre bug
          // where for mobiles only if there are
          // 2 images it is not possible to get
          // to second image
          that.isNotLastTopImage = false
        }
        // that.isNotLastTopImage = false
      } else {
        that.isNotLastTopImage = true
      }
    })
  },
  watch: {},
  methods: {
    onThumbSliderInit(params) {
      // had wanted to slideTo third image here but can't get this to trigger :(
    },
    sliderActivated(params) {
      if (this.countImagesToShow < 30) {
        // Oct 2019 -
        this.countImagesToShow = 30
        const swiperTop = this.$refs.swiperTop.swiper
        // swiperTop.update()
        // swiperThumbs.update()
        // Oct 2023 - added "this." below
        swiperTop.controller.control = this.swiperThumbs
        this.swiperThumbs.controller.control = swiperTop
      }
    },
    goToFavourites() {
      this.noticeSnackbar.isActive = true
      // let rParams = this.$route.params
      // this.$router.push({ name: 'favouritesIndexPage', params: rParams })
    },
    addToFavourites() {
      let resalesFavsKey = 'favs:resale'
      let visitorFavourites =
        JSON.parse(localStorage.getItem(resalesFavsKey)) || []
      if (!Array.isArray(visitorFavourites)) {
        visitorFavourites = []
      }
      // from lodash:
      // union(visitorFavourites, [this.currentProperty])
      visitorFavourites.push(this.currentProperty)
      // from lodash - will ensure that list does not have duplicates:
      visitorFavourites = uniqBy(visitorFavourites, 'Reference')
      localStorage.setItem(resalesFavsKey, JSON.stringify(visitorFavourites))
      // below is my way to get favourited computed prop to recompute
      this.forceFavourited = true
      this.noticeSnackbar.isActive = true
      let updateParams = {
        propDetails: this.currentProperty,
        action: 'add',
      }
      this.$store.dispatch('updateFavourites', updateParams)
    },
    toggleFilters() {
      this.showMoreSelected = !this.showMoreSelected
    },
    showReqInfo() {
      this.callbackModalVisible = true
    },
    hideCallbackModal() {
      this.callbackModalVisible = false
    },
  },
  computed: {
    showMiddlingContent() {
      // isMobileAndShowBelowFoldTriggeredOrIsDesktop
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        // In the case of mobiles, show when showBelowFold is triggered
        return this.$store.state.coreStore.showBelowFold
      } else {
        // but for desktops always show
        return true
      }
    },
    // showBottomContent() {
    //   // console.log(this.$store.state.coreStore.showBelowFold)
    //   return this.$store.state.coreStore.showBelowFold
    // },
    // isNotLastTopImage() {
    //   if (this.$refs.swiperTop) {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    swiperThumbs() {
      return this.$refs.swiperThumbs.swiper
    },
    expandClass() {
      return this.showingMore ? 'expanded' : 'expand'
    },
    moreFiltersText() {
      if (this.showingMore) {
        return this.$ft('client_shared.labels.showLess')
      } else {
        // return this.$store.getters.getI18nS('labels.readMore')
        return this.$ft('client_shared.labels.readMore')
      }
    },
    // showReqInfoBtnVisible() {
    //   return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
    // },
    showMoreBtnVisible() {
      return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
    },
    showingMore() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return this.showMoreSelected
      } else {
        return true
      }
    },
    favourited() {
      let favourited = false
      let currentPropertyRef = this.currentProperty.Reference
      let resalesFavsKey = 'favs:resale'
      let visitorFavourites =
        JSON.parse(localStorage.getItem(resalesFavsKey)) || []
      visitorFavourites.forEach(function (favorite) {
        if (favorite.Reference === currentPropertyRef) {
          favourited = true
        }
      })
      return this.forceFavourited || favourited
    },
    promotionClass() {
      let idKey = 'New Development'
      if (this.$route.params.locale === 'es') {
        idKey = 'Nueva Promoción'
      }
      if (idKey === this.currentProperty.Type2) {
        return 'new-development'
      } else {
        return ''
      }
    },
    isPromotion() {
      let idKey = 'New Development'
      if (this.$route.params.locale === 'es') {
        idKey = 'Nueva Promoción'
      }
      if (idKey === this.currentProperty.Type2) {
        return true
      } else {
        return false
      }
    },
    printUrl() {
      // let printUrl
      return (
        'https://costa-print.inmo.cloud/?reference=' +
        this.currentProperty.Reference +
        '&language=' +
        this.$store.state.coreStore.currentLocale
      )
    },
    alertDetails() {
      // If form submitted, will be used
      // by zoho to send alerts
      let alertDetails = {
        Location: this.currentProperty.Location,
        Type: this.currentProperty.Type,
        Price: this.currentProperty.Price,
        Bedrooms: this.currentProperty.Bedrooms,
        Bathrooms: this.currentProperty.Bathrooms,
        Features: '',
      }
      return alertDetails
    },
    autoTitle() {
      return this.$store.state.resalesStore.autoTitle
    },
    // descriptionClasses() {
    //   if (this.similarProps.length > 0) {
    //     return 'xl8 md8 sm7 xs12'
    //   } else {
    //     return 'xs12'
    //   }
    // },
    // mapQueryName() {
    //   return this.currentProperty.Location || "Costa del Sol"
    // },
    sidebarLinks() {
      var currentPropertyPage = this.$store.state.listingsStore
        .currentPropertyPage
      return currentPropertyPage.sidebar_links
    },
    sharedContent() {
      var currentPropertyPage = this.$store.state.listingsStore
        .currentPropertyPage
      return currentPropertyPage.raw_html
    },
    lightboxImages() {
      var lightboxImages = []
      var imageDetails = []
      if (
        this.currentProperty.Pictures &&
        this.currentProperty.Pictures.Picture
      ) {
        imageDetails = this.currentProperty.Pictures.Picture
      }
      if (imageDetails.length > 1) {
        imageDetails.forEach(function (imageDetail, index) {
          lightboxImages.push({
            thumb: imageDetail.PictureURL,
            src: imageDetail.PictureURL,
            alt_text: '',
          })
        })
        // return lightboxImages.slice(0, this.countImagesToShow)
        lightboxImages.push({})
        lightboxImages.push({})
        lightboxImages.push({})
        lightboxImages.push({})
        // above needed to fix issue with last imagesnot being clickable
        return lightboxImages
      } else {
        return []
      }
    },
  },
  data() {
    return {
      isNotLastTopImage: true,
      callbackModalVisible: false,
      showMoreSelected: false,
      noticeSnackbar: {
        top: true,
        isActive: false,
        color: 'green',
        mode: '',
        timeout: 5000,
        // text: 'Hello, I\'m a snackbar'
      },
      forceFavourited: false,
      countImagesToShow: 30,
      // loadAllImages: false,
      swiperOptionTop: {
        centeredSlides: true,
        // init: false,
        lazy: true,
        preloadImages: false,
        spaceBetween: 10,
        loop: true,
        loopedSlides: 9, //looped slides should be the same
        autoHeight: true, //enable auto height
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      swiperOptionThumbs: {
        centeredSlides: false,
        // touchRatio: 0.2,
        init: true,
        lazy: true,
        preloadImages: false,
        slidesPerView: 5,
        spaceBetween: 10,
        loop: true,
        loopedSlides: 9, //looped slides should be the same
        slideToClickedSlide: true,
        autoHeight: true, //enable auto height
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      // ightboxImages: []
    }
  },
}
</script>
<style scoped>
/* start hide/expand content */
@media only screen and (max-width: 600px) {
  .read-more-description {
    position: relative;
    max-height: 200px;
    /* padding-left: 10px;
    padding-right: 10px; */
    font-weight: 300;
    overflow: hidden;
  }
}

@media only screen and (max-width: 600px) {
  .read-more-description.expanded {
    max-height: none;
  }
}

.read-more-description .expand {
  display: none;
  box-sizing: border-box;
  width: 100%;
  padding: 50px 0 0 0;
  text-align: center;
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.9) 65%,
    #fff
  );
}
/* .read-more-description .expand a {
  color: #F7A100;
  font-weight: bold;
} */
@media only screen and (max-width: 600px) {
  .read-more-description .expand {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}

@media only screen and (max-width: 600px) {
  .read-more-description.expanded .expand {
    display: none;
  }
}
/* end hide/expand content */
#app .slider-container .printbutton,
.favebutton {
  height: 48px;
  margin: 0px;
  box-shadow: none !important;
}

#app .slider-container .favebutton.fav {
  margin-right: 10px;
}

#app .slider-container .printbutton .v-btn__content {
  text-transform: capitalize;
}

@media (max-width: 600px) {
  #app .slider-container .printbutton,
  .favebutton {
    /*float: left;*/
    margin-right: 10px;
    margin-top: 10px;
  }
}

/** Property Contact Image & Fields **/
.property-contact .v-input__slot {
  background-color: whitesmoke !important;
  border: 1px solid #d2d2d2 !important;
  box-shadow: none !important;
}

.logo-contact {
  margin: -80px auto 50px;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
<style>
/** ------------------- **/
/** Single Property CSS **/
/** --------------------**/

/** Property Title **/
.title-details {
  background-color: whitesmoke;
  padding: 9px 15px;
  display: inline-block;
  vertical-align: middle;
  font-size: 17px;
  color: #444444;
  margin-right: 10px;
  border: 2px solid #e8e8e8;
}

.t-right {
  float: right;
  font-size: 23px;
  padding: 5px 15px;
}

.title-details .v-icon {
  vertical-align: middle;
}

.title-details .bathroom-svg {
  color: #707070;
}

/** Property Link Footer **/
.link-title {
  color: white;
}

.link-btn .v-btn__content {
  justify-content: left;
  color: #a2a2a2;
}

/** Property Contact Image & Fields **/
.property-contact .v-input__slot {
  background-color: whitesmoke !important;
  border: 1px solid #d2d2d2 !important;
  box-shadow: none !important;
}

.logo-contact {
  margin: -80px auto 25px;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.08),
    0 2px 2px 0 rgba(0, 0, 0, 0.06), 0 1px 5px 0 rgba(0, 0, 0, 0.23);
}

.logo-contact-bottom {
  margin: -80px auto 10px;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.08),
    0 2px 2px 0 rgba(0, 0, 0, 0.06), 0 1px 5px 0 rgba(0, 0, 0, 0.23);
}

/** Property Location **/

.iframe-map {
  position: relative;
  padding-bottom: 40%;
  height: 0;
  overflow: hidden;
}

.iframe-map iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}

/** Property Details **/

.details-col:nth-child(even) {
  background-color: #e6e6e6;
}

.details-title,
.details-title .v-icon {
  color: #f7a100;
}

/** Property Details Energy Certificate **/

.energy {
  padding: 5px 10px;
  color: white;
}

.energy-a {
  background-color: #00855a;
}

.energy-b {
  background-color: #18b059;
}

.energy-c {
  background-color: #8dc643;
}

.energy-d {
  background-color: #ffcc01;
}

.energy-e {
  background-color: #f6ac63;
}

.energy-f {
  background-color: #f78522;
}

.energy-g {
  background-color: #ef1d3a;
}

#prop-contact .v-input--selection-controls {
  margin-top: 0 !important;
}

@media (min-width: 1264px) {
  .form-container.lg3 {
    flex-basis: 28%;
    max-width: 28%;
  }

  .slider-container.lg9 {
    flex-basis: 72%;
    max-width: 72%;
  }
}

@media (min-width: 1904px) {
  .form-container.xl3 {
    flex-basis: 20%;
    max-width: 20%;
  }

  .slider-container.xl9 {
    flex-basis: 80%;
    max-width: 80%;
  }
}

a.v-breadcrumbs__item {
  color: #f7a100;
}

.slider-row {
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}

.single-category-container .v-card.theme--light .category-col {
  padding: 0 5px !important;
}

.single-category-container .v-card.theme--light .category-col:before {
  content: '✔';
  margin: 0 10px;
  font-size: 22px;
  color: #f7a100;
}

.details-title.category-title {
  font-size: 20px !important;
}

.details-title.category-title .v-icon {
  font-size: 26px !important;
}

.category-col:nth-child(even) {
  background-color: #f7f7f7;
}
</style>