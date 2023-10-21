<template>
  <div :class="fieldDetails.fieldName">
    <v-select
      :items="selectItems"
      v-model="localFieldValue"
      :label="$ft(fieldDetails.labelTextTKey)"
      :hint="$ft(fieldDetails.labelTextTKey)"
      :persistent-hint="true"
      :placeholder="$ft(fieldDetails.labelTextTKey)"
      @change="fieldChangeHandler"
      item-text="name"
      single-line
      bottom
    ></v-select>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  // :label="$ft(fieldDetails.labelTextTKey)"
  // above does not seem to do anything on the autocomplete field..
  props: [
    'saleOrRentalCat',
    'fieldDetails',
    'currentFieldValue',
    'fieldOptions',
    'multiple',
    'mobileExtraFieldsVisible'
  ],
  data() {
    return {
      localFieldValue: ''
    }
  },
  watch: {
    currentFieldValue: {
      handler(newValue, oldVal) {
        let cfv = ''
        if (newValue) {
          cfv = newValue
        }
        this.localFieldValue = cfv
      },
      // deep: true,
      immediate: true
    }
  },
  computed: {
    selectItems() {
      let selectItems = [
        // { name: '€25,000', value: '25000' },
        // { name: '€50,000', value: '50000' },
        { name: '€75,000', value: '75000' },
        { name: '€100,000', value: '100000' },
        { name: '€150,000', value: '150000' },
        { name: '€200,000', value: '200000' },
        { name: '€250,000', value: '250000' },
        { name: '€300,000', value: '300000' },
        { name: '€400,000', value: '400000' },
        { name: '€500,000', value: '500000' },
        { name: '€600,000', value: '600000' },
        { name: '€750,000', value: '750000' },
        { name: '€1000,000', value: '1000000' },
        { name: '€2,500,000', value: '2500000' },
        { name: '€5,000,000', value: '5000000' },
        { name: '€7,500,000', value: '7500000' },
        { name: '€10,000,000', value: '10000000' }
      ]
      if (this.saleOrRentalCat === 'rentals') {
        selectItems = [
          { name: '€250', value: '250' },
          { name: '€500', value: '500' },
          { name: '€750', value: '750' },
          { name: '€1000', value: '1000' },
          { name: '€1500', value: '1500' },
          { name: '€2000', value: '2000' },
          { name: '€2500', value: '2500' },
          { name: '€3000', value: '3000' },
          { name: '€4000', value: '4000' },
          { name: '€5000', value: '5000' },
          { name: '€6000', value: '6000' },
          { name: '€7500', value: '7500' },
          { name: '€10,000', value: '10000' },
          { name: '€25,000', value: '25000' },
          { name: '€50,000', value: '50000' }
        ]
      }
      // Previously was using this too clever method:
      // let multArray = [',000', '0,000', '00,000']
      // let seedArray = ['2,5', '5,0', '7,5', '10,0']
      // multArray.forEach(mult => {
      //   seedArray.forEach(element => {
      //     if (mult.length < 6 || mult.length > 6) {
      //       element = element.replace(/,/g, '')
      //     }
      //     let val = element + mult
      //     selectItems.push({
      //       name: '€' + val,
      //       value: val.replace(/,/g, '')
      //     })
      //   })
      // })
      return selectItems
    }
    // showField() {
    //   if (this.fieldDetails.toggleOnMobile) {
    //     return this.mobileExtraFieldsVisible
    //     // return !(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
    //     // returns false for mobiles
    //   } else {
    //     return true
    //   }
    // }
  },
  methods: {
    fieldChangeHandler(selectKey) {
      this.fieldDetails.newValue = selectKey
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}
</script>