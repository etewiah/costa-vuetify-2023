<template>
  <section v-if="blockContents">
    <v-layout row wrap justify-center class="my-2">
      <v-flex xs12 sm12>
        <v-card class="elevation-0 transparent">
          <v-card-title primary-title class="layout justify-center">
            <div class="headline">
              <span v-html="blockContents.blocks.title_a.content"></span>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card class="elevation-0 transparent">
          <v-card-text>
            <span v-html="blockContents.blocks.content_a.content"></span>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 pt-3 sm6>
        <v-card class="elevation-0 transparent">
          <transition name="bounce">
            <img  v-if="showTrans" :src="blockContents.blocks.our_agency_img.content" style="width:100%;" >
          </transition>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>
<script>
export default {
  props: ["blockContents"],
  data: () => ({
    showTrans: false
  }),
  mounted: function() {
    var that = this
    setTimeout(function() {
      // debugger
      that.showTrans = true
    }, 500)
  }
}
</script>
<style>
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce 1s;
}

.bounce-leave-active {
  animation: bounce 1s reverse;
}
</style>