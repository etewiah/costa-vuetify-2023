<!-- curr only useable by search widget -->
<template>
  <v-layout mt-5 wrap row>
    <v-flex class="custom-cb-width" xs6 sm3 lg2 v-for="(checkboxItem, index) in checkboxItems" :key="index">
      <CheckBoxSingleField @selectChanged="selectChanged" :checkboxItem="checkboxItem"></CheckBoxSingleField>
    </v-flex>
  </v-layout>
</template>
<script>
import CheckBoxSingleField from '@/components/components-form-fields/SWCheckBoxSingle'

export default {
  components: {
    CheckBoxSingleField
  },
  props: ["fieldDetails", "currentFieldValue", "fieldOptions"],
  data() {
    return {
      localFieldValue: "",
      currentlyCheckedItems: []
      // checkbox: true,
      // originalValue: "",
    }
  },
  watch: {
    // currentFieldValue: {
    //   handler(newValue, oldVal) {
    //     // if (this.fieldDetails.optionsKey === "cityOptions") {
    //     //   this.localFieldValue = newValue
    //     // } else {
    //     //   this.localFieldValue = this.fieldDetails.optionsKey + "." + newValue
    //     // }
    //   },
    //   // deep: true,
    //   immediate: true,
    // },
  },
  computed: {
    checkboxItems() {
      let translated = this.fieldOptions[this.fieldDetails.optionsKey] || null

      let checkboxItems = []
      let i18n = this.$i18n
      let currentFieldValue = this.currentFieldValue || ""
      // below is an array of checked values
      // passed in via url
      let checkedValsArray = currentFieldValue.toLowerCase().split(",")
      // let fieldName = this.fieldDetails.fieldName
      if (translated) {
        Object.keys(translated).forEach(function(optionKey) {
          let label = translated[optionKey]
          // let label = i18n.t(optionKey)
          let optionKeyToCheck = optionKey.split(".")[1].toLowerCase()
          // Until I have an option to decide if to split above,
          // this component will only work for search widget with
          // options like features.wifi...
          let checkValue = checkedValsArray.includes(optionKeyToCheck)
          // console.log(checkedValsArray)
          checkboxItems.push({
            optionKey: optionKeyToCheck,
            // queryStringName: this.fieldDetails.queryStringName,
            label: label,
            // optionKey: optionKey,
            checkValue: checkValue,
            // inputType: "checkbox"
          })
        })
      }
      return checkboxItems
    },
  },
  methods: {
    selectChanged(checkboxItem) {
      // This will eventually bubble up to updateSearch here:
      // /app/javascript/theme-vienna/pages/RentPage.vue
      let currCheckedItems = []
      let currFieldValue = this.currentFieldValue || ""
      // currentFieldValue is csv of checked values
      // passed in via url
      if (currFieldValue.length > 0) {
        currCheckedItems = currFieldValue.toLowerCase().split(",")
      }
      // debugger
      // Previously I have been saving currCheckedItems locally
      // but makes more sense to have values from url
      // as source of authority
      if (checkboxItem.newCheckValue) {
        currCheckedItems.push(checkboxItem.optionKey)
      } else {
        var index = currCheckedItems.indexOf(checkboxItem.optionKey);
        if (index > -1) {
          currCheckedItems.splice(index, 1);
        }
        // currCheckedItems.splice(checkboxItem.optionKey)
      }
      // below turns array to comma sep string:
      // debugger
      this.fieldDetails.newValue = currCheckedItems.toString()
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}
</script>
<style scoped>
@media only screen and (min-width: 960px) {

  /*xl screen*/
  .flex.custom-cb-width {
    -ms-flex-preferred-size: 20%;
    flex-basis: 20%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 20%;
  }
}

@media only screen and (min-width: 768px) {}

@media only screen and (max-width: 599px) {}

.checkbox {
  float: left;
}
</style>