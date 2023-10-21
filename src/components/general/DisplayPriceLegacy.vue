<!-- works with older browsers -->
<template>
  <span>
    <template v-if="symbolLast">
      <span v-if="currencyToDisplay === 'EUR'">
            {{valueToDisplay}}€
          </span>
      <span v-if="currencyToDisplay === 'GBP'">
              {{valueToDisplay}}£
            </span>
      <span v-if="currencyToDisplay === 'USD'">
              {{valueToDisplay}}$
            </span>
    </template>
    <template v-else>
      <span v-if="currencyToDisplay === 'EUR'">
          € {{valueToDisplay}}
        </span>
      <span v-if="currencyToDisplay === 'GBP'">
          £ {{valueToDisplay}}
        </span>
      <span v-if="currencyToDisplay === 'USD'">
          $ {{valueToDisplay}}
        </span>
    </template>
  </span>
</template>
<script>
export default {
  props: ["value", "sourceCurrency", "displayCurrency", "noCents","symbolLast"],
  computed: {
    valueToDisplay() {
      if (!!!this.value) {
        return ""
      }
      var valueToDisplay = this.value / 100
      // var sourceCurrency = this.sourceCurrency || "GBP"
      // if (sourceCurrency !== this.currencyToDisplay) {
      //   var exchangeRate = .9
      //   valueToDisplay = valueToDisplay * exchangeRate
      // }
      if (this.noCents) {
        // toLocaleString will add comma separator
        return valueToDisplay.toLocaleString()
      } else {
        return valueToDisplay.toLocaleString() + ".00"
      }
    },
    currencyToDisplay() {
      var currencyToDisplay = this.displayCurrency || this.$store.state.coreStore.displayCurrency
      return currencyToDisplay.toUpperCase()
    }
  }
}
</script>