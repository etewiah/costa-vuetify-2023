<!-- aug 2018 - currently only theme-malaga has nested nav and uses this -->
<template>
  <v-btn :class="[currentNavItemClass, 'mr-1']" :style="{ backgroundColor: colors.backgroundColor }">
    <v-menu open-on-hover offset-y>
      <div slot="activator" :class="[currentNavItemClass, 'top-nav-btn']" :style="{ backgroundColor: colors.backgroundColor }">
        <span :style="{ color: colors.color }">
        {{currentNavItem.link_title}}   
      </span>
      </div>
      <v-list>
        <template v-for="(item, index) in firstSubLevelItems" @click="" v-if="true">
          <MainNavSubBtn :key="index" :subMenuItems="subMenuItems" :currentNavItem="item" :colors="colors" divClass=""></MainNavSubBtn>
        </template>
      </v-list>
    </v-menu>
  </v-btn>
</template>
<script>
import MainNavSubBtn from '@/components/components-nav/main-nav-level3/SubBtn'
import _ from 'lodash'
export default {
  components: {
    MainNavSubBtn
  },
  data() {
    return {
      currentNavItemClass: ""
    }
  },
  props: ["currentNavItem"],
  computed: {
    colors: function() {
      // not entirely sure I can use css here as I want to use vuetify vars
      var colors = {
        backgroundColor: "",
        color: this.$vuetify.theme.secondary
      }
      // var routeName = this.$
      var isActive = this.currentNavItem.routeMatchValues.includes(this.$route.name)
      // spt 2018: routeMatchValues currently set in MainNav - to move to server
      if (this.currentNavItem.routeMatchKeyId === "param_preamble") {
        isActive = this.currentNavItem.routeMatchValues.includes(this.$route.params.preamble)
        var routeMatchKey = this.$route
      }
      if (isActive) {
        this.currentNavItemClass = "router-link-active"
        colors.backgroundColor = this.$vuetify.theme.secondary
        colors.color = "white"
      }
      return colors
    },
    subMenuItems() {
      var subMenuItems = this.currentNavItem.sub_links
      return subMenuItems
    },
    firstSubLevelItems() {
      var firstSubLevelItems = []
      var that = this
      _.sortBy(this.subMenuItems, "sort_order").forEach(function(subMenuItem) {
        // this.subMenuItems.forEach(function(subMenuItem) {
        if (subMenuItem.parent_slug === that.currentNavItem.slug) {
          firstSubLevelItems.push(subMenuItem)
        }
      })
      return firstSubLevelItems
    }
  }
}
</script>
<style scoped>
/*.application .theme--light.btn:not(.btn--icon):not(.btn--flat),
.theme--light .btn:not(.btn--icon):not(.btn--flat) {
  background-color: transparent;
}*/


/*.router-link-active gets applied to any active vue router link
so below needs to be scoped to avoid having arrow niche everywhere*/
/*
Aug 2018 - removed below as no longer used by h2m
TODO - for other use cases, have a more specific selector 
that will exclude h2m
.custom-active:after,
.router-link-active:after {
  top: 0;
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
  margin: 0px 0 0 -10px;
}*/
</style>