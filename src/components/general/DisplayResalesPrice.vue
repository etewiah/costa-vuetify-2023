<!-- works with older browsers -->
<template>
  <span>
    <span v-if="maxValueToDisplay">€ {{valueToDisplay}} - € {{maxValueToDisplay}}</span>
    <span v-else>€ {{valueToDisplay}}</span>
    <span v-if="listing.RentalPeriod">{{ rentalPeriodLabel }}</span>
  </span>
</template>
<script>
export default {
  props: ['value', 'noCents', 'listing'],
  computed: {
    rentalPeriodLabel() {
      if (this.listing.RentalPeriod !== 'Month') {
        return ` per ${this.listing.RentalPeriod}`
      } else {
        return this.$ft('client_shared.core.perMonth')
        // return ` per ${this.listing.RentalPeriod}`
      }
    },
    maxValueToDisplay() {
      if (
        this.listing.RentalPrice1 &&
        this.listing.RentalPrice2 &&
        this.listing.RentalPrice1 !== this.listing.RentalPrice2
      ) {
        return this.listing.RentalPrice2
      } else {
        return false
      }
    },
    valueToDisplay() {
      let valueToDisplay = this.listing.Price || '0'
      if (this.listing.RentalPeriod) {
        valueToDisplay = this.listing.RentalPrice1
      }
      // if (!!!this.value) {
      //   return ''
      // }
      // var valueToDisplay = this.value / 100
      if (this.noCents) {
        // toLocaleString will add comma separator
        return valueToDisplay.toLocaleString()
      } else {
        return valueToDisplay.toLocaleString() + '.00'
      }
    }
    // currencyToDisplay() {
    //   var currencyToDisplay =
    //     this.displayCurrency || this.$store.state.coreStore.displayCurrency
    //   return currencyToDisplay.toUpperCase()
    // }
  }
}
</script>