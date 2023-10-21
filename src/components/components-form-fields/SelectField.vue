<template>
  <div class="">
    <div class="text-xs-left">
    </div>
    <v-select :items="selectItems" v-model="localFieldValue" :label="$ft(fieldDetails.labelTextTKey)" @change="fieldChangeHandler" item-text="name" single-line bottom></v-select>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  props: ["fieldDetails", "currentFieldValue", "fieldOptions"],
  data() {
    return {
      localFieldValue: "",
    }
  },
  watch: {
    currentFieldValue: {
      handler(newValue, oldVal) {
        if (newValue) {
          this.localFieldValue = newValue
        } else {
          // let defaultValue = this.fieldDetails.defaultValue
          // this.selectItems.find(item => item.value === defaultValue)
          this.localFieldValue = this.fieldDetails.defaultValue
        }
        // if (["city", "maxPrice"].includes(this.fieldDetails.fieldName)) {
        //   this.localFieldValue = newValue
        // } else {
        //   this.localFieldValue = this.fieldDetails.optionsKey + "." + newValue
        // }
      },
      // deep: true,
      immediate: true,
    },
  },
  computed: {
    selectItems() {
      // let fieldOptions = this.$store.state.searchStore.
      let rawVals = []
      let optionsType = "simple_list"
      if (this.fieldDetails.optionsValues) {
        rawVals = this.fieldDetails.optionsValues
      } else {
        optionsType = "object_list"
        rawVals = this.fieldOptions[this.fieldDetails.optionsKey] || []
      }
      let selectItems = [{ name: "", value: "" }]
      // let i18n = this.$i18n
      // let fieldName = this.fieldDetails.fieldName
      let isCurrency = false
      if (["minPrice", "maxPrice"].includes(this.fieldDetails.fieldName)) {
        isCurrency = true
      }
      rawVals.forEach(function(optionKey) {
        let name = optionKey
        let val = optionKey
        if (isCurrency) {
          // name = $n(optionKey, "currency", "EUR")
          // don't think I have $i18n setup for above 
          name = "€" + optionKey
          // below removes comma
          val = optionKey.replace(/,/g, '')
        } else {
          if (optionsType === "object_list") {
            name = _.startCase(optionKey.label)
            val = optionKey.global_key
          }
        }
        selectItems.push({
          name: name,
          value: val
        })
      })
      if (isCurrency) {
        return selectItems
        // _.sortBy(selectItems, "val")
      } else {
        return _.sortBy(selectItems, "name")

      }
    },
  },
  methods: {
    fieldChangeHandler(selectKey) {
      // // this.fieldDetails.newValueFullKey = selectKey
      // if (["city", "maxPrice"].includes(this.fieldDetails.fieldName)) {
      //   // if (this.fieldDetails.optionsKey === "cityOptions") {
      //   var shortSelectKey = selectKey
      // } else {
      //   // substr below removes the prefix for the key (like "propertyTypes.")
      //   // This is to avoid cluttering the url with long querystrings
      //   var shortSelectKey = selectKey.substr(this.fieldDetails.optionsKey.length + 1)
      // }
      this.fieldDetails.newValue = selectKey
      // encodeURI(selectKey)
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}
</script>