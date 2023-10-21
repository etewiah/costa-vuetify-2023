<!-- July 2019 - not used by marbella theme-->
<template>
  <div @click.stop="closeLightBox">
    <div class="vue-lb-container" v-show="lightBoxOn" ref="container">
      <div class="vue-lb-content">
        <div class="vue-lb-header">
          <span></span>
          <button type="button" title="Close (Esc)" class="vue-lb-button-close">
            <span>
            <svg fill="white" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;">
              <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4 L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1 c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1 c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"></path>
            </svg>
          </span>
          </button>
          <!-- .vue-lb-button-close -->
        </div>
        <!-- .vue-lb-header -->
        <div v-if="lightBoxOn" class="">
          <iframe id="ytplayer" type="text/html" :width="videoWidth" :height="videoHeight" :src="videoUrl" frameborder="0"></iframe>
          <!--           <youtube :video-id="videoId" class="vue-lb-modal-image" style="" :player-vars="videoVars"></youtube>
 -->
        </div>
        <!-- removed image display  -->
      </div>
      <!-- .vue-lb-content -->
      <!--       <div class="vue-lb-thumbnail-wrapper">
      </div>
 -->
      <!-- removed buttons -->
    </div>
    <!-- .vue-lb-container -->
  </div>
</template>
<script>
// Based on:
// https://raw.githubusercontent.com/pexea12/vue-image-lightbox/master/src/components/script.js
// import Hammer from 'hammerjs'
// require('./style.css')
export default {
  computed: {
    // https://support.google.com/youtube/answer/6375112?hl=en&co=GENIE.Platform%3DDesktop
    videoWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '426px'
        case 'sm':
          return '640px'
        case 'md':
          return '854px'
        case 'lg':
          return '1280px'
        case 'xl':
          return '1280px'
      }
    },
    videoHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '240px'
        case 'sm':
          return '360px'
        case 'md':
          return '480px'
        case 'lg':
          return '720px'
        case 'xl':
          return '720px'
      }
    }
  },
  props: {
    // videoVars: Object,
    videoUrl: String,
    images: {
      type: Array,
      // default: []
      // required: true,
    },

    disableScroll: {
      type: Boolean,
      default: true,
    },

    showLightBox: {
      type: Boolean,
      default: true,
    },

    startAt: {
      type: Number,
      default: 0,
    },

    nThumbs: {
      type: Number,
      default: 7,
    },

    showThumbs: {
      type: Boolean,
      default: true,
    },

    // Mode
    autoPlay: {
      type: Boolean,
      default: false,
    },

    autoPlayTime: {
      type: Number,
      default: 3000,
    },

    siteLoading: {
      default: null,
    },

    showCaption: {
      type: Boolean,
      default: false,
    },

    lengthToLoadMore: {
      type: Number,
      default: 0
    },
  },

  data() {
    return {
      // startVideo: false,
      select: this.startAt,
      lightBoxOn: this.showLightBox,
      timer: null,
    }
  },

  watch: {
    lightBoxOn(value) {
      if (document != null) {
        this.onToggleLightBox(value)
      }
    },

    // select() {
    //   if (this.select >= this.images.length - this.lengthToLoadMore - 1)
    //     this.$emit('onLoad')

    //   if (this.select === this.images.length - 1)
    //     this.$emit('onLastIndex')

    //   if (this.select === 0)
    //     this.$emit('onFirstIndex')

    //   if (this.select === this.startAt)
    //     this.$emit('onStartIndex')
    // },
  },

  mounted() {
    // this.startVideo = true

    // if (this.autoPlay) {
    //   this.timer = setInterval(() => {
    //     this.nextImage()
    //   }, this.autoPlayTime)
    // }

    this.onToggleLightBox(this.lightBoxOn)

    // Ed - aug 2018 - might import Hammer for below some other time:
    // const hammer = new Hammer(this.$refs.container)

    // hammer.on('swiperight', () => {
    //   this.previousImage()
    // })

    // hammer.on('swipeleft', () => {
    //   this.nextImage()
    // })
  },

  methods: {
    onToggleLightBox(value) {
      if (this.disableScroll) {
        document.querySelector('html').classList.toggle('no-scroll', value)
      }

      document.querySelector('body').classList.toggle('vue-lb-open', value)
      this.$emit('onOpened', value)

      if (value) {
        document.addEventListener('keydown', this.addKeyEvent)
      } else {
        document.removeEventListener('keydown', this.addKeyEvent)
      }
    },

    showImage(index) {
      this.$set(this, 'lightBoxOn', true)
      this.$set(this, 'select', index)
    },

    addKeyEvent(event) {
      // if (event.keyCode === 37) this.previousImage() // left arrow
      // if (event.keyCode === 39) this.nextImage() // right arrow
      if (event.keyCode === 27) this.closeLightBox() // esc
    },

    closeLightBox() {
      this.$set(this, 'lightBoxOn', false)
      // this.startVideo = false
    },

    // nextImage() {
    //   this.$set(this, 'select', (this.select + 1) % this.images.length)
    // },

    // previousImage() {
    //   this.$set(this, 'select', (this.select + this.images.length - 1) % this.images.length)
    // },
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.addKeyEvent)

    if (this.autoPlay) {
      clearInterval(this.timer)
    }
  },
}
</script>
<style>
.vue-lb-content {
  max-width: 3000px !important;
}
</style>