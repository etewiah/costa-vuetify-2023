<template>
  <transition name="router-anim">
    <section v-if="showTransition" fluid>
      <v-layout column wrap class="my-1">
        <v-flex class="content-html" xs12>
          <div v-html="blockContents.blocks.main_content.content"></div>
        </v-flex>
      </v-layout>
    </section>
  </transition>
</template>
<script>
export default {
  props: ["blockContents"],
  data: () => ({
    showTransition: false
  }),
  watch: {
    blockContents: {
      handler(newVal, oldVal) {
        if (oldVal) {
          // if there had been blockContents before
          // below will activate transition out
          this.showTransition = false
        }
        if (newVal) {
          // and below will activate transition in
          // if there is new content
          var that = this
          setTimeout(function() {
            that.showTransition = true
          }, 200)
        }
      },
      // Aug 2018 - below needed for pageWithForm (glenwood mgmt page)
      // which has content immediately on render
      immediate: true
    }
  },
}
</script>
<style>
/*@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";*/

.content-html h2 {
  padding: 8px 0px;
}




/*
Try to keep in sync with 
/app/javascript/shared-admin/components-edit/HtmlField.vue and
app/javascript/shared-admin/components-edit/PagePartHtml.vue */

.router-anim-enter-active {
  animation: coming .3s;
  animation-timing-function: cubic-bezier(.65, 0, .32, 1.55);
  opacity: 0;
}

.router-anim-leave-active {
  animation: going .1s;
  animation-timing-function: cubic-bezier(.8, -0.49, .36, 1);
}

@keyframes going {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(300px);
    opacity: 0;
  }
}

@keyframes coming {
  from {
    transform: translateY(300px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>