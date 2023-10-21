<template>
  <div class>
    <v-text-field
      v-model="localFieldValue"
      :placeholder="$ft(fieldDetails.labelTextTKey)"
      hide-details
      hide-selected
      item-text="name"
      @change="fieldChangeHandler"
      prefix="€"
      item-value="symbol"
      mask="##########"
      :class="['home-field', 'hero-price-text', hfClass]"
      height="54"
      light
    ></v-text-field>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  // :label="$ft(fieldDetails.labelTextTKey)"
  // above does not seem to do anything on the autocomplete field..
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
.hero-price-text {
  background-color: white;
  margin-top: 0px;
  height: 65px;
  color: black;
}
/* .v-input__control {
  margin-left: 5px;
} */
</style>