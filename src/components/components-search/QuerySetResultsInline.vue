<template>
  <v-container v-if="listings.length > 0" class="showcase" fluid px-0>
    <v-layout class="mb-3" row wrap>
      <v-flex xs12 mt-5 mb-4>
        <!--   CHANGED V.4 -->
        <span class="headline">
          {{ resultSet ? resultSet.title : "" }}
        </span>
      </v-flex>
      <swiper @touchStart="resalesSliderActivated" v-if="showResalesPrerenderRows" class="pb-1" :options="swiperOptionsResales" ref="swiperResales">
        <swiper-slide v-for="(slideHtml, index) in preRenderedSlides" :key="index">
          <div v-html="slideHtml.innerHTML"></div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <swiper @touchStart="resalesSliderActivated" v-if="showResalesRows" class="pb-1" :options="swiperOptionsResales" ref="swiperResales">
        <swiper-slide v-for="(property, index) in listings" :key="index">
          <ResalesRowItem :useCarousel="false" :property="property" :index="index"></ResalesRowItem>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <swiper @touchStart="promoSliderActivated" v-if="modelName === 'PromotionListing'" class="pb-1" :options="swiperOptionsPromotions" ref="swiperPromotions">
        <swiper-slide v-for="(property, index) in listings" :key="index">
          <PromotionsRowItemMedium :noTransitionDelay="true" :property="property" :index="index"></PromotionsRowItemMedium>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </v-layout>
  </v-container>
</template>
<script>
import ResalesRowItem from '@/components/components-resales/ResalesRowItemCosta'
// import ResalesRowItem from '@/components/components-resales/ResalesRowItem'
import PromotionsRowItemMedium from '@/components/components-prop/PromotionsRowItemMedium'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import RentalPropertiesRowItem from '@/components/components-prop/RentalPropertiesRowItem'
export default {
  components: {
    swiper,
    swiperSlide,
    ResalesRowItem,
    PromotionsRowItemMedium
    // RentalPropertiesRowItem
  },
  props: ["resultSet"],
  data: () => ({
    countSlidesToShow: 20,
    swiperOptionsPromotions: {
      loop: true,
      autoHeight: true, //enable auto height
      slidesPerView: 3,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        1904: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1264: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        736: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        550: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    },
    swiperOptionsResales: {
      loop: false,
      lazy: true,
      preloadImages: false,
      updateOnImagesReady: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      // above 2 needed when slidesPerView is set:
      // https://idangero.us/swiper/api/#lazy 
      autoHeight: true, //enable auto height
      slidesPerView: 5,
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        1904: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1264: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        860: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        550: {
          slidesPerView: 1,
          spaceBetween: 10
        }
      }
    }
  }),
  methods: {
    promoSliderActivated(params) {
      // Aug 2019 - this was an attempt to optimise 
      // page speed by only retrieving a few items first
      // No longer workable with prerendering trick
      // if (this.countSlidesToShow < 20) {
      //   this.countSlidesToShow = 20
      //   const swiperPromotions = this.$refs.swiperPromotions.swiper
      //   swiperPromotions.update()
      // }
    },
    resalesSliderActivated(params) {
      // if (this.countSlidesToShow < 20) {
      //   this.countSlidesToShow = 20
      //   const swiperResales = this.$refs.swiperResales.swiper
      //   swiperResales.update()
      // }
    }
  },
  mounted: function() {
    // var that = this
    // setTimeout(function() {
    //   that.showTransition = true
    // }, 2000)
  },
  computed: {
    showResalesPrerenderRows(){
      return (this.modelName === 'ResalesSaleListing') && (this.preRenderedSlides.length > 0)
    },
    showResalesRows(){
      return (this.modelName === 'ResalesSaleListing') && (this.preRenderedSlides.length < 1)
    },
    preRenderedSlides() {
      let preRenderedSlides = []
      let preRenderedFrag = this.$store.state.coreStore.preRenderedFrag
      if (preRenderedFrag && preRenderedFrag.querySelector && preRenderedFrag.querySelector(".home-props-row-outer")) {
        // preRenderedSlides = preRenderedFrag.querySelector(".home-props-row-outer").outerHTML || ""
        // preRenderedSlides = preRenderedFrag.querySelector(".home-props-row-outer .swiper-container").querySelectorAll(".swiper-slide") || []
        preRenderedSlides = preRenderedFrag.querySelectorAll(".swiper-slide")
      }
      return preRenderedSlides
    },
    modelName() {
      return (this.resultSet && this.resultSet.model_name) ? this.resultSet.model_name : ""
    },
    listings() {
      return (this.resultSet && this.resultSet.listings) ? this.resultSet.listings.slice(0, this.countSlidesToShow) : []
    }
  }
}
</script>
<style scoped>
</style>