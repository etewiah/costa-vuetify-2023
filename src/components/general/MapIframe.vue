<template>
  <div>
    <div class="iframe-map">
      <iframe width="600" height="450" frameborder="0" style="border:0" :src="mapSrc" allowfullscreen>
      </iframe>
    </div>
    <v-card-actions class="px-5 py-4">
      <span>
        <v-icon color="#F7A100">place</v-icon><b class="headline">{{ mapQueryName }}</b><br>
          {{ $ft('client_shared.maps.notExact')}}
      </span>
      <v-spacer></v-spacer>
      <v-btn style="display: none;" depressed color="#F7A100" dark>See in Map</v-btn>
    </v-card-actions>
  </div>
</template>
<script>
export default {
  props: ["location"],
  data: function() {
    return {}
  },
  // created() {
  // },
  computed: {
    mapQueryName: function(){
      return this.location || "Costa del Sol"
    },
    mapSrc: function() {
      return "https://www.google.com/maps/embed/v1/place?key=AIzaSyBPeKxIfOXlq969Qd4n10kbnVYnTVZ6sLY&q=" + this.mapQueryName + ",+España"
      // https://www.google.com/maps/embed/v1/place?key=AIzaSyBPeKxIfOXlq969Qd4n10kbnVYnTVZ6sLY&q=Mijas+Costa,+España
    }
  }
}
</script>
<style>
</style>