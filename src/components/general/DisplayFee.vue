<!-- eslint-disable no-extra-boolean-cast -->
<!-- works with older browsers
- Might merge later with DisplayPriceLegacy -->
<template>
  <span>
    <template v-if="symbolLast">
      {{valueToDisplay}}
      <span v-if="currencyToDisplay === 'EUR'">
        €
      </span>
      <span v-if="currencyToDisplay === 'GBP'">
        £
      </span>
      <span v-if="currencyToDisplay === 'USD'">
        $
      </span>
    </template>
    <template v-else>
      <span v-if="currencyToDisplay === 'EUR'">
        €
      </span>
      <span v-if="currencyToDisplay === 'GBP'">
        £
      </span>
      <span v-if="currencyToDisplay === 'USD'">
        $
      </span>
      {{valueToDisplay}}
    </template>
    <span v-if="value">
      /year
    </span>
  </span>
</template>
<script>
export default {
  props: ["value", "sourceCurrency", "displayCurrency", "noCents", "symbolLast"],
  computed: {
    valueToDisplay() {
      if (!this.value) {
        if (this.$store.state.coreStore.currentLocale === "en") {
          return "Unknown"
        } else {
          return "N/A"
        }
      }
      var valueToDisplay = this.value
      if (this.noCents) {
        // toLocaleString will add comma separator
        return valueToDisplay.toLocaleString()
      } else {
        return valueToDisplay.toLocaleString() + ".00"
      }
    },
    currencyToDisplay() {
      var currencyToDisplay = this.displayCurrency || this.$store.state.coreStore.displayCurrency
      if (!this.value) {
        return ""
      } else {
        return currencyToDisplay.toUpperCase()
      }
    }
  }
}
</script>