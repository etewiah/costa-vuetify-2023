<!-- SW for SearchWidget -->
<template>
  <v-layout mt-5 wrap row>
    <v-flex sm12>
      <div class="text-xs-left pt-3 subheading">
        {{$ft(fieldDetails.labelTextTKey)}}
      </div>
    </v-flex>
    <v-flex class="custom-cb-width" xs12 v-for="(checkboxItem, index) in checkboxItems" :key="index">
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
      let cbOptions = this.fieldDetails.optionsValues || []
      // let cbOptions = [
      //   {optionKey: "0",
      //   label: "0"},
      //   {optionKey: "1",
      //   label: "1"},
      //   {optionKey: "2",
      //   label: "2"},
      //   {optionKey: "3x",
      //   label: "3 +"}
      // ]
      // this.fieldOptions[this.fieldDetails.optionsKey]


      let checkboxItems = []
      // let i18n = this.$i18n
      let currentFieldValue = this.currentFieldValue || ""
      // below is an array of checked values
      // passed in via url
      let checkedValsArray = currentFieldValue.toLowerCase().split(",")
      // let fieldName = this.fieldDetails.fieldName
      if (cbOptions) {
        cbOptions.forEach(function(optionItem) {
          // let label = cbOptions[optionItem]
          // let label = i18n.t(optionItem)
          let optionKeyToCheck = optionItem["optionKey"].toLowerCase()
          let checkValue = checkedValsArray.includes(optionKeyToCheck)
          // 
          // Have to push a new item below to be able to
          // re-initialize values of previous selected
          // checkbox when a new one is selected
          checkboxItems.push({
            optionKey: optionItem.optionKey,
            label: optionItem.label,
            checkValue: checkValue
          })
        })
      }
      return checkboxItems
    },
  },
  methods: {
    selectChanged(checkboxItem) {
      this.fieldDetails.newValue = checkboxItem.optionKey
      // currCheckedItems.toString()
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}
</script>
<style scoped>
/*@media only screen and (min-width: 960px) {
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
}*/
</style>