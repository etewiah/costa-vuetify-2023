<template>
  <v-layout mt-0 mb-2 wrap row>
    <v-flex xs12 mt-1 mb-3>
      <span class="headline">{{ $ft('client_shared.labels.searchMap')}}</span>
    </v-flex>
    <!-- <v-flex class="iframe-container" xs12 mb-0>
      <iframe frameborder="0" style="border:0" :src="svgMapSrc" allowfullscreen></iframe>
    </v-flex> -->

    <!-- This would not be clickable <img :src="svgMapSrc" alt="Map with links" /> -->
    <v-flex class="svg-map-flex mb-2 pb-1" v-html="msHtml" xs12 mb-0></v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({}),
  props: {
    currentPage: Object
  },

  computed: {
    msHtml() {
      let msHtml = this.currentPage.extra_html || ''
      return msHtml
    },
    svgMapSrc() {
      return `/${this.$store.state.coreStore.currentLocale}/x/mapsections`
    }
  }
}
</script>
<style>
.iframe-container {
  overflow: hidden;
  padding-top: 46.25%;
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

/* 4x3 Aspect Ratio */
.iframe-container-4x3 {
  padding-top: 75%;
}

/** Map */

.svg-container svg {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border: 5px solid white;
}

.svg-container {
  margin-bottom: 10px;
  padding-bottom: 5px;
  /* width: 100%;
  height: 0;
  padding-top: 40.35%;
  position: relative; */
}

/* below now in app/views/extras/mapsections.html.erb */
svg {
  /* position: absolute;
  top: 0;
  left: 0; */
}

path.prov {
  fill: #F7A100;
}

g:hover > path.prov {
  fill: #F04F16;
  cursor: pointer;
}

path.water {
  fill: #5cabdf;
}

path.other-prov {
  fill: #bbcca9;
}

g > text {
  display: none;
}

g:hover > text {
  display: block;
  cursor: pointer;
}
</style>