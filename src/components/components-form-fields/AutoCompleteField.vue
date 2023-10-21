<template>
  <div :class="fieldDetails.fieldName">
    <div class="text-xs-left"></div>
    <v-autocomplete
      browser-autocomplete="new-password"
      :dense="false"
      cache-items
      :debounce-search="10"
      :clearable="true"
      no-data-text
      :filter="filterFunc"
      :items="selectItems"
      v-model="localFieldValue"
      :label="$ft(fieldDetails.labelTextTKey)"
      :hint="$ft(fieldDetails.labelTextTKey)"
      persistent-hint
      @change="fieldChangeHandler"
      item-text="name"
      :multiple="multiple"
      single-line
      menu-props="bottom"
      ref="autoSelect"
    >
      <template v-if="multiple" slot="prepend-item">
        <v-list-tile ripple @click="activateSelectAll">
          <v-list-tile-action>
            <v-icon>{{ icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ $ft('client_shared.core.selectAll') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider class="mt-2"></v-divider>
      </template>
      <template v-slot:selection="data">
        <v-chip
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @input="removeSelected(data.item)"
        >{{ data.item.name }}</v-chip>
      </template>
    </v-autocomplete>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  // :label="$ft(fieldDetails.labelTextTKey)"
  // above does not seem to do anything on the autocomplete field..
  props: ['fieldDetails', 'currentFieldValue', 'fieldOptions', 'multiple'],
  // TODO - use form of props that ensures that
  // currentFieldValue is an array
  data() {
    return {
      localFieldValue: '',
      searchInputSync: null,
      slicedSelectItems: []
    }
  },
  watch: {
    // searchInputSync(typedVal) {
    //   console.log(this.selectItems)
    //   // idea here had been to use ":search-input.sync="searchInputSync""
    //   // like here https://vuetifyjs.com/en/components/autocompletes#asynchronous-items
    //   // but the experience sucks
    //   typedVal &&
    //     typedVal !== this.localFieldValue &&
    //     this.querySelections(typedVal)
    // },
    currentFieldValue: {
      // This might be better done with vue's .sync (new in 2.3)
      handler(newValue, oldVal) {
        let cfv = this.fieldDetails.defaultValue || ''
        if (newValue) {
          cfv = newValue
        }
        if (this.multiple) {
          cfv = Array.isArray(cfv) ? cfv : cfv.split(',')
          cfv = _.uniq(cfv)
          // returning unique array
          // items in case a value like Estepona is passed in twice
          _.pull(cfv, '')
          // above needed because "".split(",") will
          // return an array of [""]
        }
        this.localFieldValue = cfv
        // if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        // }
        setTimeout(() => {
          // Close select popup after a value is picked
          this.$refs.autoSelect.isMenuActive = false
        }, 50)
      },
      // deep: true,
      immediate: true
    }
  },
  computed: {
    selectItems() {
      // let fieldOptions = this.$store.state.searchStore.searchSelectOptions
      let rawVals = []
      let optionsType = 'simple_list'
      if (this.fieldDetails.optionsValues) {
        rawVals = this.fieldDetails.optionsValues
        if (this.fieldDetails.optionsType === 'object_list') {
          optionsType = 'object_list'
        }
      } else {
        optionsType = 'object_list'
        // These are values retrieved from FieldKey col in db
        rawVals = this.fieldOptions[this.fieldDetails.optionsKey] || []
      }
      let selectItems = []

      // let isCurrency = false
      // if (["minPrice", "maxPrice"].includes(this.fieldDetails.fieldName)) {
      //   isCurrency = true
      // }
      let preserveLabel = false
      if (['priceRange', 'maxPrice'].includes(this.fieldDetails.fieldName)) {
        preserveLabel = true
      }
      rawVals.forEach(function(optionKey) {
        let name = optionKey
        let val = optionKey
        // if (isCurrency) {
        //   name = "€" + optionKey
        //   // below removes comma
        //   val = optionKey.replace(/,/g, '')
        // } else {
        if (optionsType === 'object_list') {
          if (preserveLabel) {
            name = optionKey.label
          } else {
            // startCase below will capitalise each word
            // but will also remove accents
            name = _.startCase(optionKey.label)
            // Not used for price range labels
          }
          val = optionKey.global_key
        } else {
          // name = optionKey
          // deburr below will remove accents
          val = _.deburr(optionKey)
        }
        // }
        selectItems.push({
          name: name,
          value: val
        })
      })
      if (preserveLabel) {
        return selectItems
        // _.sortBy(selectItems, "val")
      } else {
        let sortedSelectItems = _.sortBy(selectItems, 'name')
        // sortedSelectItems.unshift(emptyOpt)
        return sortedSelectItems
      }
    },
    selectedAll() {
      return this.localFieldValue.length === 0
    },
    // likesSomeFruit() {
    //   return this.localFieldValue.length > 0 && !this.selectedAll
    // },
    icon() {
      if (this.selectedAll) return 'check_box'
      // if (this.likesSomeFruit) return 'mdi-minus-box'
      return 'check_box_outline_blank'
    }
  },
  methods: {
    // querySelections(v) {
    //   // this.loading = true
    //   this.slicedSelectItems = this.selectItems
    //     .filter(e => {
    //       return (
    // even with toLocaleLowerCase, accents are not handled
    //         (e.value || '').toLocaleLowerCase().indexOf((v || '').toLocaleLowerCase()) > -1
    //       )
    //     })
    //     // .slice(0, 5)
    // },
    removeSelected(item) {
      const index = this.localFieldValue.indexOf(item.value)
      if (index >= 0) {
        // this.localFieldValue.splice(index, 1)
        // We emit event with the new array of selected values and let
        // that event handle things
        this.localFieldValue.splice(index, 1)
        this.fieldDetails.newValue = this.localFieldValue
        this.$emit('selectChanged', this.fieldDetails)
      }
    },
    filterFunc(item, queryText, itemText) {
      // after removing accents on the value field of items
      // still had to replace the default filter function with below
      // to enable autocomplete to be accent insensitive
      return (
        item.value.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
        -1
      )
    },
    activateSelectAll(evt) {
      // Any number of clicks always turns it on
      // deactivated by selecting any other option
      // this.$nextTick(() => {
      //         })
      this.localFieldValue = ''
      this.fieldDetails.newValue = ''
      // Sending an empty new value means filter will not be
      // applied which is eq to selecting all
      this.$emit('selectChanged', this.fieldDetails)
    },
    fieldChangeHandler(selectKeys) {
      // // this.fieldDetails.newValueFullKey = selectKeys
      // if (["city", "maxPrice"].includes(this.fieldDetails.fieldName)) {
      //   // if (this.fieldDetails.optionsKey === "cityOptions") {
      //   var shortSelectKeys = selectKeys
      // } else {
      //   // substr below removes the prefix for the key (like "propertyTypes.")
      //   // This is to avoid cluttering the url with long querystrings
      //   var shortSelectKeys = selectKeys.substr(this.fieldDetails.optionsKey.length + 1)
      // }

      // in the case of cities selector, selectKeys is an array of strings
      this.fieldDetails.newValue = selectKeys
      // encodeURI(selectKeys)
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}
</script>