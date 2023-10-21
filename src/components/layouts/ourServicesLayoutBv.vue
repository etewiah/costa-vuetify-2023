<template>
  <div>
    <ourServicesTemplateBv>
      <template v-for="details in slotDetails" :slot="details.fieldName">
        <span v-if="details.inputType === 'html'" v-html="details.fieldValue"></span>
        <span v-else>{{details.fieldValue }}</span>
      </template>
    </ourServicesTemplateBv>
  </div>
</template>
<script>
import ourServicesTemplateBv from '@jsroot/shared/layouts/ourServicesTemplateBv'
export default {
  // Has corresponding edit layout here:
  // /app/javascript/shared-admin/components-inline-edit/ourServicesLayoutBvEdit.vue
  components: {
    ourServicesTemplateBv
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
      // let currentPage = this.$store.state.coreStore.currentPage
      // if (currentPage.details) {
      //   let slots = currentPage.details.slots || {}
      //   let slotValues = slots[activeLocale] || {}
      //   currentPageSlots.forEach(function(slot) {
      //     slot.fieldValue = slotValues[slot.fieldName]
      //   })
      // }
      return currentPageSlots
    }
  }
}
</script>
<style>
</style>