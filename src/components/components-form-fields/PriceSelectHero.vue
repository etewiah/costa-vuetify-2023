<template>
  <div class>
    <v-select
      :items="selectItems"
      v-model="localFieldValue"
      :persistent-hint="false"
      :label="$ft(fieldDetails.labelTextTKey)"
      @change="fieldChangeHandler"
      item-text="name"
      single-line
      bottom
      :class="['home-field', 'hero-price-select', hfClass]"
      height="65"
      light
    ></v-select>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: ['fieldDetails', 'currentFieldValue', 'fieldOptions', 'multiple'],
  data() {
    return {
      localFieldValue: ''
    }
  },
  watch: {
    currentFieldValue: {
      handler(newValue, oldVal) {
        let cfv = ''
        // let cfv = this.fieldDetails.defaultValue || ""
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
    },
    hfClass() {
      if (this.index === 0) {
        return 'hf-left'
      } else {
        return 'hf-center'
      }
    }
  },
  methods: {
    fieldChangeHandler(selectKey) {
      this.fieldDetails.newValue = selectKey
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}
</script>
<style>
.hero-price-select {
  background-color: white;
  margin-top: 0px !important;
  padding-top: 0px !important;
  height: 65px;
  color: black;
}
.hero-price-select .v-input__slot {
  padding: 0px 10px;
}
</style>