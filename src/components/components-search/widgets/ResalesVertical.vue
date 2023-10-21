<template>
  <v-card class="mb-5 inmo-card px-0 py-0">
    <v-progress-linear
      v-if="isLoading && $vuetify.breakpoint.smAndDown"
      :indeterminate="true"
    ></v-progress-linear>
    <v-container class="pa-1">
      <span name="search-box-fade">
        <v-card-text>
          <v-layout wrap row>
            <v-flex xs12>
              <div class="text-xs-left py-2 headline">
                <span class>{{ $ft('client_shared.labels.advSearch') }}</span>
              </div>
            </v-flex>
            <v-flex
              v-for="(fieldDetails, index) in searchFields"
              :key="fieldDetails.fieldName"
              xs12
            >
              <template v-if="fieldDetails.inputType == 'priceText'">
                <div class="search-dropdown-container">
                  <PriceSelect
                    :saleOrRentalCat="saleOrRentalCat"
                    :mobileExtraFieldsVisible="true"
                    :multiple="fieldDetails.isMultipleSelect"
                    @selectChanged="triggerSearchUpdate"
                    :fieldDetails="fieldDetails"
                    :currentFieldValue="
                      queryParams[fieldDetails.queryStringName]
                    "
                  ></PriceSelect>
                </div>
              </template>
              <template v-if="fieldDetails.inputType == 'select'">
                <div class="search-dropdown-container">
                  <AutoCompleteField
                    :multiple="fieldDetails.isMultipleSelect"
                    @selectChanged="triggerSearchUpdate"
                    :fieldDetails="fieldDetails"
                    :currentFieldValue="
                      queryParams[fieldDetails.queryStringName]
                    "
                    :fieldOptions="searchSelectOptions"
                  ></AutoCompleteField>
                </div>
              </template>
              <template v-else-if="fieldDetails.inputType == 'datePicker'">
                <div class="search-datepick-container">
                  <DatePickerField
                    :multiple="fieldDetails.isMultipleSelect"
                    @selectChanged="triggerSearchUpdate"
                    :fieldDetails="fieldDetails"
                    :currentFieldValue="
                      queryParams[fieldDetails.queryStringName]
                    "
                    :fieldOptions="searchSelectOptions"
                  ></DatePickerField>
                </div>
              </template>
              <template v-else-if="fieldDetails.inputType == 'groupedSelect'">
                <div class="search-dropdown-container">
                  <AutoCompleteFieldGrouped
                    :multiple="false"
                    @selectChanged="triggerSearchUpdate"
                    :index="index"
                    :fieldDetails="fieldDetails"
                    :currentFieldValue="
                      queryParams[fieldDetails.queryStringName]
                    "
                    :fieldOptions="searchSelectOptions"
                  ></AutoCompleteFieldGrouped>
                </div>
              </template>
              <template v-else-if="fieldDetails.inputType == 'counter'">
                <div class="search-increment-field-container">
                  <IncrementField
                    :mobileExtraFieldsVisible="true"
                    @selectChanged="triggerSearchUpdate"
                    :fieldDetails="fieldDetails"
                    :currentFieldValue="
                      queryParams[fieldDetails.queryStringName]
                    "
                    :fieldOptions="searchSelectOptions"
                  ></IncrementField>
                </div>
              </template>

              <!-- <template v-else-if="fieldDetails.inputType == 'counter'">
                <SWCountCheckBoxes :mobileExtraFieldsVisible="mobileExtraFieldsVisible" @selectChanged="triggerSearchUpdate" :fieldDetails="fieldDetails" :currentFieldValue="queryParams[fieldDetails.queryStringName]" :fieldOptions="searchSelectOptions"></SWCountCheckBoxes>
              </template>-->
              <template v-else-if="fieldDetails.inputType == 'countCheckBoxes'">
                <div class="search-dropdown-container">
                  <SWCountCheckBoxes
                    :mobileExtraFieldsVisible="true"
                    @selectChanged="triggerSearchUpdate"
                    :fieldDetails="fieldDetails"
                    :currentFieldValue="
                      queryParams[fieldDetails.queryStringName]
                    "
                    :fieldOptions="searchSelectOptions"
                  ></SWCountCheckBoxes>
                </div>
              </template>
              <template
                v-else-if="
                  mobileExtraFieldsVisible &&
                  fieldDetails.inputType == 'featuresGroupCheckBox'
                "
              >
                <div class="search-features-picker-container">
                  <template
                    v-for="(groupInfo, groupIndex) in fieldDetails.groups"
                  >
                    <SWGroupedCheckBoxes
                      :key="groupIndex"
                      @selectChanged="triggerSearchUpdate"
                      :fieldDetails="fieldDetails"
                      :groupInfo="groupInfo"
                      :currentFieldValue="
                        queryParams[fieldDetails.queryStringName]
                      "
                      :fieldOptions="searchSelectOptions"
                    ></SWGroupedCheckBoxes>
                  </template>
                </div>
              </template>
            </v-flex>
            <v-flex v-if="extraFieldsButtonVisible" pt-3 xs12>
              <v-btn
                class="more-filters-button white--text"
                large
                depressed
                block
                color="#F7A100"
                @click="toggleFilters()"
                >{{ moreFiltersText }}</v-btn
              >
            </v-flex>
          </v-layout>
        </v-card-text>
      </span>
    </v-container>
  </v-card>
</template>
<script>
import PriceSelect from '@/components/components-form-fields/PriceSelect'
import AutoCompleteField from '@/components/components-form-fields/AutoCompleteField'
import DatePickerField from '@/components/components-form-fields/DatePickerField'
import IncrementField from '@/components/components-form-fields/SWIncrementField'
// import SWCountCheckBoxes from '@/components/components-form-fields/SWCountCheckBoxes'
import SWGroupedCheckBoxes from '@/components/components-form-fields/SWGroupedCheckBoxes'
import AutoCompleteFieldGrouped from '@/components/components-form-fields/AutoCompleteFieldGrouped'
// import _ from 'lodash'
export default {
  components: {
    PriceSelect,
    DatePickerField,
    // SWCountCheckBoxes,
    IncrementField,
    AutoCompleteField,
    AutoCompleteFieldGrouped,
    SWGroupedCheckBoxes,
  },
  props: [
    'saleOrRentalCat',
    'searchFields',
    'queryParams',
    'searchSelectOptions',
    'isLoading',
    'isMobileModal',
  ],
  methods: {
    toggleFilters() {
      // Oct 2019 - toggling filters is redundant
      // this.moreFiltersSelected = !this.moreFiltersSelected
    },
    triggerSearchUpdate(fieldDetails) {
      // up the chain
      this.$emit('triggerSearchUpdate', fieldDetails)
    },
  },
  computed: {
    moreFiltersText() {
      // Jan 2020 - currently disabled
      if (this.mobileExtraFieldsVisible) {
        return this.$ft('client_shared.labels.hideExtraFields')
        // return this.$store.getters.getI18nS('labels.hideExtraFields')
      } else {
        return this.$ft('client_shared.labels.showExtraFields')
      }
    },
    extraFieldsButtonVisible() {
      return false
      // return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
    },
    mobileExtraFieldsVisible() {
      if (this.isMobileModal) {
        return false
      } else {
        return true
      }
      // if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
      //   return this.moreFiltersSelected
      // } else {
      //   return true
      // }
    },
  },
  data: () => ({
    // moreFiltersSelected: false
  }),
  mounted: function () {},
}
</script>
<style scoped>
.v-progress-linear {
  margin: 0px;
}
/*.search-box-fade-enter-active {
  transition: all 3s ease;
}
.search-box-fade-leave-active {
  transition-delay: 3s;
}
.search-box-fade-enter,
.search-box-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}*/
</style>