// Oct 2019 - not sure testimonials layout is in use
<template>
  <div>
    <TestimonialsPositioner>
      <template v-for="details in slotDetails" :slot="details.fieldName">
        <span v-if="details.inputType === 'html'" v-html="details.fieldValue">
        </span>
        <component :currentPage="$store.state.coreStore.currentPage" :is="details.composerComponent" :isEditMode="false" v-else-if="details.inputType === 'array'"  :baseFieldInfo="details" ></component>
        <span v-else>
          {{details.fieldValue }}
        </span>
      </template>
    </TestimonialsPositioner>
  </div>
</template>
<script>
import ViewTestimonialsCarousel from '@jsroot/shared/components-slots/ViewTestimonialsCarousel'
import TestimonialsPositioner from '@jsroot/shared/components-slots/positioners/TestimonialsBv'
export default {
  // Has corresponding edit layout here:
  // /app/javascript/shared-admin/components-inline-edit/????
  components: {
    ViewTestimonialsCarousel,
    TestimonialsPositioner,
  },
  computed: {
    slotDetails() {
      debugger
      let currentPageSlots = this.$store.state.coreStore.currentPageSlots
      let currentPage = this.$store.state.coreStore.currentPage
      let activeLocale = this.$store.state.coreStore.currentLocale
      if (currentPage.details) {
        let slots = currentPage.details.slots || {}
        let slotValues = slots[activeLocale] || {}
        currentPageSlots.forEach(function(slot) {
          slot.fieldValue = slotValues[slot.fieldName]
        })
      }
      return currentPageSlots
    }
  }
}
</script>
<style>
</style>