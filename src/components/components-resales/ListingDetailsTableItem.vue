<template>
  <v-card-actions class="details-col pa-3">
    <span>{{ $ft(fieldDetails.labelTKey)}}</span>
    <v-spacer></v-spacer>
    <span v-if="fieldDetails.fieldType === 'price' ">
      <span v-if="isPromotion">{{$ft("client_shared.fieldLabels.from") }}</span>
      <DisplayResalesPrice :listing="currentProperty" :noCents="true"></DisplayResalesPrice>
    </span>
    <span v-else-if="fieldDetails.fieldType === 'fee' ">
      <DisplayFee
        :symbolLast="false"
        :noCents="true"
        sourceCurrency="EUR"
        displayCurrency="EUR"
        :value="currentProperty[fieldDetails.fieldKey]"
      ></DisplayFee>
    </span>
    <span v-else-if="fieldDetails.fieldType === 'energyRating' ">
      <DisplayEnergyRating :value="currentProperty[fieldDetails.fieldKey]"></DisplayEnergyRating>
    </span>
    <span v-else>{{ displayVal }}</span>
  </v-card-actions>
</template>
<script>
import _ from 'lodash'
import DisplayResalesPrice from '@/components/general/DisplayResalesPrice'
import DisplayPriceLegacy from '@/components/general/DisplayPriceLegacy'
import DisplayFee from '@/components/general/DisplayFee'
import DisplayEnergyRating from '@/components/general/DisplayEnergyRating'
export default {
  components: {
    DisplayEnergyRating,
    DisplayResalesPrice,
    DisplayFee
  },
  props: ['currentProperty', 'fieldDetails', 'isPromotion'],
  data: () => ({}),
  mounted: function() {},
  computed: {
    displayVal() {
      let displayVal = this.currentProperty[this.fieldDetails.fieldKey]
      if (displayVal) {
        if (
          ['Built', 'GardenPlot', 'Terrace'].includes(
            this.fieldDetails.fieldKey
          )
        ) {
          displayVal = displayVal + 'm²'
        }
        return displayVal
      } else {
        if (this.$store.state.coreStore.currentLocale === 'en') {
          return 'Unknown'
        } else {
          return 'N/A'
        }
      }
    }
  }
}
</script>
<style scoped>
</style>