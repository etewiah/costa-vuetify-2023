<template>
  <span>
    <template v-if="itemSubLinks.length > 0">
      <MainNavSubBtn1SmDown :currentNavItem="item" :colors="colors" :displaySettings="displaySettings"></MainNavSubBtn1SmDown>
    </template>
    <template v-else>
      <v-list-tile :key="item.slug" :to="{path: item.link_url}" :exact="item.exact">
        <v-list-tile-title flat>{{item.link_title}}
        </v-list-tile-title>
      </v-list-tile>
    </template>
    <v-divider></v-divider>
  </span>
</template>
<script>
// import MainNavSubBtn1SmDown from '@jsroot/shared/components-nav/main-nav-level2/SubBtn1SmDown'

export default {
  components: {
    // MainNavSubBtn1SmDown
  },
  props: ["item", "displaySettings"],
  computed: {
    itemSubLinks: function(){
      // TODO - calculate based on navLinks with parent_slug
      // corresponding to current item slug
      return []
    },
    colors: function() {
      let colors = {
        backgroundColor: "",
        color: this.$vuetify.theme.secondary
      }
      if (this.$route.path === this.item.link_url) {
        colors.backgroundColor = this.$vuetify.theme.secondary
        colors.color = "white"
      }
      return colors
    }
  }
}
</script>
<style scoped>
.my-flat {
  box-shadow: none!important;
}

.router-link-exact-active:after {
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
}
</style>