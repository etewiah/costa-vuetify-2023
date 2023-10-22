<template>
  <div>
    <v-container
      v-if="propertiesToDisplay.length > 0"
      class="showcase"
      fluid
      px-0
    >
      <v-layout class="mb-3" row wrap>
        <swiper
          class="pb-1"
          :options="swiperOptionsResales"
          ref="swiperResales"
        >
          <swiper-slide
            v-for="(property, index) in propertiesToDisplay"
            :key="index"
          >
            <ResalesRowItem
              :useCarousel="false"
              :property="property"
              :index="index"
            ></ResalesRowItem>
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </v-layout>
    </v-container>
    <!-- <v-flex
      xs12
      v-for="(property, index) in propertiesToDisplay"
      :key="property.Reference"
    >
      <ResalesRowItem
        :noTransitionDelay="true"
        :property="property"
        :index="index"
      ></ResalesRowItem>
    </v-flex> -->
  </div>
</template>
<script>
// // import SalePropertiesRowItem from '@/components/components-prop/SalePropertiesRowItem'
// import ResalesRowItem from '@/components/components-resales/ResalesRowItem'
import ResalesRowItem from '@/components/components-resales/ResalesRowItemCosta'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    // SalePropertiesRowItem,
    ResalesRowItem,
    swiper,
    swiperSlide,
  },
  props: ['propertiesToDisplay', 'saleOrRentalCat'],
  data: () => ({
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
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        1904: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1264: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        860: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        550: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    },
  }),
  mounted: function () {},
  computed: {},
}
</script>
<style scoped>
</style>