<template>
  <div>
    <template v-if="itemSubLinks.length > 0">
      <MainNavSubBtnMdUp :currentNavItem="item" :navLinks="navLinks"></MainNavSubBtnMdUp>
    </template>
    <template v-else>
      <v-btn :class="[currentNavItemClass, 'mr-1']" :style="{ backgroundColor: colors.backgroundColor }">
        <router-link class="top-nav-btn" :key="item.slug" :to="{path: item.link_url}" :exact="item.exact" flat>
          <span class="btn__content" color="" :style="{ color: colors.color }">
                {{item.link_title}}
        </span>
        </router-link>
      </v-btn>
    </template>
  </div>
</template>
<script>
import MainNavSubBtnMdUp from '@/components/components-nav/main-nav-level2/SubBtnMdUp'
export default {
  components: {
    MainNavSubBtnMdUp
  },
  data() {
    return {
      currentNavItemClass: ""
    }
  },
  props: ["item","navLinks"],
  // name: 'my-btn',
  // extends: VBtn,
  computed: {
    itemSubLinks: function(){
      // TODO - calculate based on navLinks with parent_slug
      // corresponding to current item slug
      return []
    },
    colors: function() {
      // not entirely sure I can use css here as I want to use vuetify vars
      var colors = {
        backgroundColor: "",
        color: this.$vuetify.theme.secondary
      }

      var isActive = this.$route.path === this.item.link_url

      if (!isActive) {
        isActive = this.item.route_match_values.includes(this.$route.name)
        if (this.item.route_match_key === "param_preamble") {
          isActive = this.item.route_match_values.includes(this.$route.params.preamble)
          var routeMatchKey = this.$route
        }
      }


      if (isActive) {
        colors.backgroundColor = this.$vuetify.theme.secondary
        colors.color = "white"
      }
      // for h2m, below does not apply
      // if ((this.item.link_path === "rent_path") && (this.$route.name === "propertyDetails")) {
      //   this.currentNavItemClass = "router-link-active"
      //   colors.backgroundColor = this.$vuetify.theme.secondary
      //   colors.color = "white"        
      // }
      return colors
    }
  }
}
</script>
<style scoped>
.top-nav-btn {
  text-decoration: none;
}
/*.router-link-active gets applied to any active vue router link
so below needs to be scoped to avoid having arrow niche everywhere*/
.custom-active:after,
.router-link-active:after {
/*  top: 0;
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(136, 183, 213, 0);
  border-top-color: #fff;
  border-width: 10px;
  margin: 0px 0 0 -10px;*/
}
</style>