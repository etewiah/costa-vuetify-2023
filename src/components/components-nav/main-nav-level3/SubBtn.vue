<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div :class="divClass">
    <template v-if="secondLevelItems.length > 0">
      <!-- below was from when I had yet another level of nav for guides -->
      <!--       <v-menu style="width: 100%;" offset-x left open-on-hover>
        <v-list-item slot="activator" @click="">
          <v-list-item-title>{{ currentNavItem.link_title }}</v-list-item-title>
          <v-list-item-action class="justify-start">
            <v-icon>play_arrow</v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list dense>
          <template v-for="(item, index) in secondLevelItems" @click="">
           //pageName below should link to link_page_slug 
            <v-list-item :key="index" :to="{name: 'guidesPage',
         params: { locale: $store.state.coreStore.currentLocale, 
         pageName: item.slug,
         area: item.parent_slug}
       }" :exact="item.exact">
              <v-list-item-title flat>{{item.link_title}}
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu> -->
    </template>
    <template v-else>
      <template v-if="currentNavItemToRouteTo.target_path">
        <v-list-item
          slot="activator"
          :to="{
            path: currentNavItemToRouteTo.target_path,
          }"
        >
          <v-list-item-title>{{
            currentNavItemToRouteTo.link_title
          }}</v-list-item-title>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item
          slot="activator"
          :to="{
            name: currentNavItemToRouteTo.link_route,
            params: currentNavItemToRouteTo.params,
          }"
        >
          <v-list-item-title>{{
            currentNavItemToRouteTo.link_title
          }}</v-list-item-title>
        </v-list-item>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  props: ["subMenuItems", "divClass", "colors", "currentNavItem"],
  computed: {
    currentNavItemToRouteTo() {
      var preamble = "alquiler-vacacional"
      if (this.$store.state.coreStore.currentLocale === "en") {
        preamble = "vacation-rentals"
      }
      if (this.currentNavItem.link_route === "shortTermRentalByCity") {
        var params = {
          preamble: preamble,
          city: this.currentNavItem.link_route_params,
        }
        // this.currentNavItem.params = params
      }
      // Oct 2023 - took out above and below because of:
      // no-side-effects-in-computed-properties

      // else {
      //   this.currentNavItem.params = {
      //     preamble: preamble
      //   }
      // }
      // this.currentNavItem.params.locale = this.$store.state.coreStore.currentLocale
      return this.currentNavItem
    },
    secondLevelItems() {
      var secondLevelItems = []
      var that = this
      this.subMenuItems.forEach(function (subMenuItem) {
        if (subMenuItem.parent_slug === that.currentNavItem.slug) {
          // TODO - have some logic here that calculates name and params
          // to route to instead of having it hardcoded..
          secondLevelItems.push(subMenuItem)
        }
      })
      return secondLevelItems
    },
  },
}
</script>
<style scoped></style>
