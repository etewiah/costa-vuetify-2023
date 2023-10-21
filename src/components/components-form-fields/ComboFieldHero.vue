<!-- Apr 2019 - not currently in use -->
<!-- TO allow passing in reference id to search for listing -->
<!-- disabling multiple values because they will not work with above -->
<template>
  <v-combobox :items="selectItems" :filter="filterFunc" v-model="localFieldValue" :label="$ft(fieldDetails.labelTextTKey)" :hint="$ft(fieldDetails.labelTextTKey)" persistent-hint @change="fieldChangeHandler" item-text="name" :multiple="false" light clearable hide-details solo text :class="['home-field', hfClass]" height="65">
  </v-combobox>
</template>
<script>
import _ from 'lodash'
export default {
  // :label="$ft(fieldDetails.labelTextTKey)"
  // above does not seem to do anything on the autocomplete field..
  props: ["fieldDetails", "currentFieldValue", "fieldOptions", "index"],
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
          // this.localFieldValue = this.fieldDetails.defaultValue
          // if (this.multiple) {
          //   this.localFieldValue = [this.fieldDetails.defaultValue]
          // } else {
          // this.localFieldValue = this.fieldDetails.defaultValue
          // }
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
    hfClass() {
      if (this.index === 0) {
        return "hf-left"
      } else {
        return "hf-center"
      }
    },
    selectItems() {
      // let fieldOptions = this.$store.state.searchStore.searchSelectOptions
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
            // startCase below will capitalise each word
            // but will also remove accents
            name = _.startCase(optionKey.label)
            val = optionKey.global_key
          } else {
            name = optionKey
            // deburr below will remove accents
            val = _.deburr(optionKey)
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
    filterFunc(item, queryText, itemText) {
      // after removing accents on the value field of items
      // still had to replace the default filter function with below
      // to enable autocomplete to be accent insensitive
      return item.value.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
    },
    fieldChangeHandler(selectKey) {

      this.fieldDetails.newValue = selectKey

      // below specifically works for city field where optionsValues
      // have been passed in along with fieldDetails
      // var newValueFromOptions = this.fieldDetails.optionsValues.includes(selectKey)
      var newValueFromOptions = this.selectItems.includes(selectKey)

      var treatNewValueAsListingRef = (selectKey && !newValueFromOptions)
      if (treatNewValueAsListingRef) {
        this.$emit('redirToListing', selectKey)
      }
      // 
    }
  }
}
</script>