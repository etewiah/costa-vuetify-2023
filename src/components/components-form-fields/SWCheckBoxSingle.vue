<!-- curr only useable by search widget -->
<template>
  <v-checkbox light row="true" :label="checkboxItem.label.toString()" v-model="checkboxItem.checkValue" @change="fieldChangeHandler"></v-checkbox>
</template>
<script>
export default {
  props: ["checkboxItem"],
  data() {
    return {
      // localFieldValue: "",
      // checkbox: true
    }
  },
  computed: {
    // localFieldValue() {
    //   return this.checkboxItem.checkValue
    //   //  Computed property "localFieldValue" was assigned to but it has no setter
    //   //would need setter to use comp value here
    // }
  },
  // mounted: function() {
  //   this.localFieldValue = this.checkboxItem.checkValue
  // },
  // watch: {
  //   checkboxItem.checkValue: {
  //     handler(newValue, oldVal) {
  //       // if ((typeof newValue !== 'undefined')) {
  //       //   this.localFieldValue = newValue.checkValue
  //       // }
  //     },
  //     // immediate: true
  //   }
  // },
  methods: {
    fieldChangeHandler(newCheckValue) {
      this.checkboxItem.newCheckValue = newCheckValue
      // // this.fieldDetails.newValueFullKey = selectKey
      // if (this.fieldDetails.optionsKey === "cityOptions") {
      //   var shortSelectKey = selectKey
      // } else {
      //   // substr below removes the prefix for the key (like "propertyTypes.")
      //   // This is to avoid cluttering the url with long querystrings
      //   var shortSelectKey = selectKey.substr(this.fieldDetails.optionsKey.length + 1)
      // }
      // this.fieldDetails.newValue = shortSelectKey
      this.$emit('selectChanged', this.checkboxItem)
    }
  }
}
</script>
<style scoped>
.checkbox {
  float: left;
}
/*.input-group__details{
  min-height: 2px;
}
*/</style>