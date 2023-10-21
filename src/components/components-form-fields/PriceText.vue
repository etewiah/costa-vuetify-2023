<template>
  <div v-show="showField" :class="fieldDetails.fieldName">
    <v-text-field
      v-model="localFieldValue"
      @change="fieldChangeHandler"
      prefix="€"
      item-value="symbol"
      :hint="$ft(fieldDetails.labelTextTKey)"
      :persistent-hint="true"
      :placeholder="$ft(fieldDetails.labelTextTKey)"
      mask="##########"
      class="search-input-price home-field"
      height="65"
    ></v-text-field>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  // :label="$ft(fieldDetails.labelTextTKey)"
  // above does not seem to do anything on the autocomplete field..
  props: [
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
    showField() {
      if (this.fieldDetails.toggleOnMobile) {
        return this.mobileExtraFieldsVisible
        // return !(this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm)
        // returns false for mobiles
      } else {
        return true
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