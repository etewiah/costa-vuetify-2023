<!-- curr only useable by search widget -->
<!-- should rename as features checkboxes as thats what it really is -->
<template>
  <v-layout mt-5 wrap row>
    <v-flex>
      <div class="text-xs-left pt-2 subheading">
        <v-icon light>{{groupInfo.icon}}</v-icon> <span class="group-head-text" style="text-transform: uppercase;">{{$ft(groupInfo.labelTextTKey) }}</span>
      </div>
    </v-flex>
    <v-flex class="" xs12 v-for="(checkboxItem, index) in checkboxItems" :key="index">
      <CheckBoxSingleField @selectChanged="selectChanged" :checkboxItem="checkboxItem"></CheckBoxSingleField>
    </v-flex>
  </v-layout>
</template>
<script>
import CheckBoxSingleField from '@/components/components-form-fields/SWCheckBoxSingle'
import _ from 'lodash'
export default {
  components: {
    CheckBoxSingleField
  },
  props: ["fieldDetails", "currentFieldValue", "fieldOptions", "groupInfo"],
  data() {
    return {
      localFieldValue: "",
      // currentlyCheckedItems: []
      // checkbox: true,
      // originalValue: "",
    }
  },
  watch: {
    currentFieldValue: {
      handler(newValue, oldVal) {
        // if (this.fieldDetails.optionsKey === "cityOptions") {
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
    checkboxItems() {
      let fieldOptions = this.$store.state.searchStore.searchSelectOptions
      let untranslated = fieldOptions[this.fieldDetails.optionsKey] || []
      let checkboxItems = []

      let currentFieldValue = this.currentFieldValue || ""
      // below is an array of checked values
      // passed in via url
      let checkedValsArray = currentFieldValue.toLowerCase().split(",")
      let group_key = this.groupInfo["key"]
      untranslated.forEach(function(optionKey) {
        if (group_key === optionKey.group_key) {
          let checkValue = checkedValsArray.includes(optionKey.global_key.toLowerCase())

          let label = _.startCase(optionKey.label)
          let val = optionKey.global_key
          // selectItems.push({
          //   name: name,
          //   value: val
          // })
          checkboxItems.push({
            optionKey: optionKey.global_key,
            // queryStringName: this.fieldDetails.queryStringName,
            label: label,
            // optionKey: optionKey,
            checkValue: checkValue,
            // inputType: "checkbox"
          })
        }
      })
      return _.sortBy(checkboxItems, "name")
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
      // Previously I have been saving currCheckedItems locally
      // but makes more sense to have values from url
      // as source of authority

      // 
      let changedValue = checkboxItem.optionKey.toLowerCase()

      if (checkboxItem.newCheckValue) {
        // if the changedValue has been selected
        // add it to the checked items array
        currCheckedItems.push(changedValue)
      } else {
        // if the changedValue has been unselected
        // remove it from the checked items array
        var index = currCheckedItems.indexOf(changedValue);
        if (index > -1) {
          currCheckedItems.splice(index, 1);
        }
        // currCheckedItems.splice(checkboxItem.optionKey)
      }
      // below turns array to comma sep string:
      this.fieldDetails.newValue = currCheckedItems.toString()
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}
</script>
<style>
.group-head-text {
  text-transform: uppercase;
}

@media only screen and (min-width: 960px) {

  /*xl screen*/
  /*  .flex.custom-cb-width {
    -ms-flex-preferred-size: 20%;
    flex-basis: 20%;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    max-width: 20%;
  }*/
}

@media only screen and (min-width: 768px) {}

@media only screen and (max-width: 599px) {}

</style>