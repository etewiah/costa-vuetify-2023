<template>
  <span>
    <div v-if="!interacted"
      class="v-input v-text-field v-text-field--single-line v-text-field--solo v-text-field--solo-flat v-text-field--enclosed v-select v-autocomplete v-input--hide-details theme--light home-field hf-left"
    >
      <div class="v-input__control">
        <div class="v-input__slot" style="height: 65px;">
          <div class="v-select__slot">
            <label
              aria-hidden="true"
              class="v-label theme--light"
              style="left: 0px; right: auto; position: absolute;"
            >{{$ft(fieldDetails.labelTextTKey)}}</label>
            <div class="v-select__selections">
              <input aria-label="Stad" type="text" autocomplete="new-password" role="combobox" />
            </div>
            <div class="v-input__append-inner">
              <div class="v-input__icon v-input__icon--">
                <i aria-hidden="true" class="v-icon v-icon--link material-icons theme--light"></i>
              </div>
            </div>
            <div class="v-input__append-inner">
              <div class="v-input__icon v-input__icon--append">
                <i aria-hidden="true" class="v-icon material-icons theme--light">arrow_drop_down</i>
              </div>
            </div>
          </div>
          <div class="v-menu"></div>
        </div>
      </div>
    </div>
    <v-autocomplete
      v-else
      :dense="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
      browser-autocomplete="new-password"
      :items="selectItems"
      :filter="filterFunc"
      v-model="localFieldValue"
      :label="$ft(fieldDetails.labelTextTKey)"
      :hint="$ft(fieldDetails.labelTextTKey)"
      persistent-hint
      @change="fieldChangeHandler"
      item-text="name"
      :multiple="multiple"
      light
      clearable
      hide-details
      solo
      flat
      :class="['home-field', hfClass]"
      :height="autocompleteHeight"
      :search-input.sync="searchInput"
      ref="acfh"
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
  </span>
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
    'index',
    'multiple',
    'interacted'
  ],
  data() {
    return {
      localFieldValue: '',
      searchInput: null
    }
  },
  watch: {
    searchInput(typedVal) {
      if (!typedVal) {
        setTimeout(() => {
          // Close select popup after a value is picked
          this.$refs.acfh.isMenuActive = false
        }, 50)
      }
    },
    currentFieldValue: {
      handler(newValue, oldVal) {
        if (newValue) {
          this.localFieldValue = newValue
        } else {
          if (this.multiple) {
            this.localFieldValue = this.fieldDetails.defaultValue
              ? [this.fieldDetails.defaultValue]
              : []
          } else {
            this.localFieldValue = this.fieldDetails.defaultValue
          }
        }
        // setTimeout(() => {
        //   // Close select popup after a value is picked
        //   this.$refs.acfh.isMenuActive = false
        // }, 50)
      },
      // deep: true,
      immediate: true
    }
  },
  computed: {
    autocompleteHeight() {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        return null
      } else {
        return '65'
      }
    },
    hfClass() {
      if (this.index === 0) {
        return 'hf-left'
      } else {
        return 'hf-center'
      }
    },
    selectItems() {
      // let fieldOptions = this.$store.state.searchStore.searchSelectOptions
      let rawVals = []
      let optionsType = 'simple_list'
      if (this.fieldDetails.optionsValues) {
        rawVals = this.fieldDetails.optionsValues
      } else {
        optionsType = 'object_list'
        rawVals = this.fieldOptions[this.fieldDetails.optionsKey] || []
      }
      let selectItems = []

      let preserveLabel = false
      if (['priceRange'].includes(this.fieldDetails.fieldName)) {
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
    icon() {
      if (this.selectedAll) return 'check_box'
      return 'check_box_outline_blank'
    }
  },
  methods: {
    removeSelected(item) {
      const index = this.localFieldValue.indexOf(item.value)
      if (index >= 0) {
        this.localFieldValue.splice(index, 1)
        this.fieldDetails.newValue = this.localFieldValue
        // this.localFieldValue.splice(index,1)
      }
      this.$refs.acfh.isMenuActive = false
    },
    activateSelectAll(evt) {
      // Any number of clicks always turns it on
      // deactivated by selecting any other option
      this.localFieldValue = ''
      this.fieldDetails.newValue = ''
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
    fieldChangeHandler(selectKey) {
      this.fieldDetails.newValue = selectKey
      // For HomeHero, value change is only handled when search
      // button is clicked
      // this.$emit('selectChanged', this.fieldDetails)
      // Unlike on search page the typed input does not get cleared
      // after selecting so need to do below:
      this.searchInput = ''
    }
  }
}
</script>