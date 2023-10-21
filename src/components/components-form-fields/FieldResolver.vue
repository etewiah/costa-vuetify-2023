<template>
  <div class="mr-4 mb-1">
    <template v-if="fieldDetails.inputType == 'number'">
      <TextField :fieldDetails="fieldDetails" :cancelPendingChanges="cancelPendingChanges" :currentFieldValue="this.resourceModel[this.fieldDetails.fieldName]" @updatePendingChanges="updatePendingChanges(...arguments)"></TextField>
    </template>
    <template v-else-if="fieldDetails.inputType == 'date'">
      <DateField @updatePendingChanges="updatePendingChanges(...arguments)" :fieldDetails="fieldDetails" :currentFieldValue="this.resourceModel[this.fieldDetails.fieldName]" :fieldOptions="fieldOptions" :cancelPendingChanges="cancelPendingChanges"></DateField>
    </template>
    <template v-else-if="fieldDetails.inputType == 'select'">
      <SelectField @updatePendingChanges="updatePendingChanges(...arguments)" :fieldDetails="fieldDetails" :currentFieldValue="this.resourceModel[this.fieldDetails.fieldName]" :fieldOptions="fieldOptions" :cancelPendingChanges="cancelPendingChanges"></SelectField>
    </template>
    <template v-else-if="fieldDetails.inputType == 'trueFalse'">
      <SwitchField @updatePendingChanges="updatePendingChanges(...arguments)" :fieldDetails="fieldDetails" :cancelPendingChanges="cancelPendingChanges" :switchFieldValue="this.resourceModel[this.fieldDetails.fieldName]"></SwitchField>
    </template>
    <template v-else>
      <TextField :fieldDetails="fieldDetails" :cancelPendingChanges="cancelPendingChanges" :currentFieldValue="this.resourceModel[this.fieldDetails.fieldName]" @updatePendingChanges="updatePendingChanges(...arguments)"></TextField>
    </template>
  </div>
</template>
<script>
import SwitchField from '@jsroot/shared-admin/form-fields/with-rollback/SwitchField'
import TextField from '@jsroot/shared-admin/components-edit/TextField'
import SelectField from '@jsroot/shared-admin/form-fields/with-rollback/SelectFieldWR'
import DateField from '@jsroot/shared-admin/form-fields/with-rollback/DateField'
// import { required, minLength } from 'vuelidate/lib/validators'

export default {
  components: {
    SwitchField,
    TextField,
    SelectField,
    DateField
  },
  props: ["resourceModel", "fieldDetails", "fieldOptions", "cancelPendingChanges"],
  data() {
    return {}
  },
  computed: {
    // currentFieldValue: {
    //   get() {
    //     this.fieldDetails.originalValue = _.clone(this.resourceModel[this.fieldDetails.fieldName])
    //     return this.fieldDetails.originalValue
    //   },
    //   // // setter
    //   set(newValue) {
    //     this.fieldDetails.newValue = newValue
    //     this.$store.dispatch('updatePendingChanges', this.fieldDetails, newValue)
    //   }
    // }
  },
  methods: {
    // feb 2019 - just noticed that if I $emit('updatePendingChanges' from child component
    // like SelectField, this will get triggered even though I have not explicitly
    // bound it in the component declaration
    updatePendingChanges(fieldDetailsWithNewValue) {
      this.$emit('updatePendingChanges', fieldDetailsWithNewValue)
    },
  }
}

</script>
