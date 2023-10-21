<template>
  <div>
    <v-container pt-5 pb-5 grid-list-xl>
      <ViewAboutAgency></ViewAboutAgency>
    </v-container>
    <aboutUsTemplateBv>
      <template v-for="details in slotDetails" :slot="details.fieldName">
        <span
          :key="details.fieldName"
          v-if="details.inputType === 'html'"
          v-html="details.fieldValue"
        ></span>
        <!-- Jan 2020 todo - remove below as composerComponent no longer used -->
        <!-- <component
          :key="details.fieldName"
          :currentPage="$store.state.coreStore.currentPage"
          :is="details.composerComponent"
          :isEditMode="false"
          v-else-if="details.inputType === 'array'"
          :baseFieldInfo="details"
        ></component>-->
        <component
          :key="details.fieldName"
          :currentPage="$store.state.coreStore.currentPage"
          :is="details.viewerComponent"
          :isEditMode="false"
          v-else-if="details.inputType === 'indexedArray'"
          :baseFieldInfo="details"
        ></component>
        <span :key="details.fieldName" v-else>{{details.fieldValue }}</span>
      </template>
    </aboutUsTemplateBv>
  </div>
</template>
<script>
import ViewOurTeam from '@jsroot/shared/components-slots/ViewOurTeam'
import ViewAboutAgency from '@jsroot/shared/components-slots/ViewAboutAgency'
import ViewTestimonialsCarousel from '@jsroot/shared/components-slots/ViewTestimonialsCarousel'
import aboutUsTemplateBv from '@jsroot/shared/components-slots/positioners/aboutUsTemplateBv'
export default {
  // Has corresponding edit layout here:
  // /app/javascript/shared-admin/components-inline-edit/aboutUsLayoutBvEdit.vue
  components: {
    ViewAboutAgency,
    ViewTestimonialsCarousel,
    ViewOurTeam,
    aboutUsTemplateBv
  },
  computed: {
    slotDetails() {
      let activeLocale = this.$store.state.coreStore.currentLocale
      let slotValuesAll = this.$store.getters.allViewSlotsForLocale(
        activeLocale
      )
      let currentPageSlots = this.$store.state.coreStore.currentPageSlots
      currentPageSlots.forEach(function(slotConfigField) {
        // slotConfigFields are hard coded on the server with info about how to render etc
        slotConfigField.fieldValue = slotValuesAll[slotConfigField.fieldName]
        // above adds the db stored values for each field
      })
      return currentPageSlots
    }
  }
}
</script>
<style>
</style>