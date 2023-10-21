<template>
  <span class="nav-md-up-l1">
    <template v-if="itemSubLinks.length > 0">
      <MainNavSubBtnMdUp :currentNavItem="item" :navLinks="navLinks"></MainNavSubBtnMdUp>
    </template>
    <template v-else>
      <v-btn
        :class="[item.href_class]"
        exact-active-class="actual"
        :key="item.slug"
        :to="{path: item.link_url}"
        :exact="item.exact"
        flat
      >{{item.link_title}}</v-btn>
    </template>
  </span>
</template>
<script>
import MainNavSubBtnMdUp from '@jsroot/theme-marbella/components-nav/main-nav-level2/SubBtnMdUp'
export default {
  components: {
    MainNavSubBtnMdUp
  },
  data() {
    return {
      currentNavItemClass: ''
    }
  },
  props: ['item', 'navLinks'],
  // name: 'my-btn',
  // extends: VBtn,
  computed: {
    itemSubLinks: function() {
      return this.item.child_links || []
    }
    // colors: function() {
    //   // not entirely sure I can use css here as I want to use vuetify vars
    //   var colors = {
    //     backgroundColor: "",
    //     color: this.$vuetify.theme.secondary
    //   }
    //   var isActive = this.$route.path === this.item.link_url
    //   if (!isActive) {
    //     isActive = this.item.route_match_values.includes(this.$route.name)
    //     if (this.item.route_match_key === "param_preamble") {
    //       isActive = this.item.route_match_values.includes(this.$route.params.preamble)
    //       var routeMatchKey = this.$route
    //     }
    //   }
    //   if (isActive) {
    //     colors.backgroundColor = this.$vuetify.theme.secondary
    //     colors.color = "white"
    //   }
    //   return colors
    // }
  }
}
</script>
<style>
.nav-md-up-l1 a {
  height: 100% !important;
}
.nav-md-up-l1 a.v-btn--active {
  /*exact-active-class does not always work which is why I need this*/
  border-bottom: 4px solid #F7A100;
  border-top: 4px solid transparent;
  border-radius: 0;
}
</style>