<!-- apr 2019 - not much reason why this can't be a simple select field -->
<template>
  <span>
    <div
      v-if="!interacted"
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
      :class="['home-field','input-no-keyboard', hfClass]"
      height="65"
    >
      <template slot="selection" slot-scope="data">
        <span v-if="data.item">{{ data.item.name }}</span>
      </template>
      <template v-slot:item="data">
        <template v-if="data.item.isGroupHead">
          <div class="font-weight-bold auto-group-head" v-text="data.item.name"></div>
        </template>
        <template v-else>
          <v-avatar class="ml-1">-</v-avatar>
          <v-list-item-content>
            <v-list-item-title>
              <div class="pl-1">{{data.item.name}}</div>
            </v-list-item-title>
          </v-list-item-content>
        </template>
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
  // data() {
  // },
  // mounted() {
  //   this.$nextTick(() => {
  //     let inputEl = this.$el
  //       .getElementsByClassName('input-no-keyboard')[0]
  //       .getElementsByTagName('input')[0]
  //     // Below is to avoid mobile (soft) keyboard appearing
  //     inputEl.type = 'button'
  //   })
  // },
  watch: {
    interacted: {
      handler(newValue, oldVal) {
        this.$nextTick(() => {
          let inputEl = this.$el
            .getElementsByClassName('input-no-keyboard')[0]
            .getElementsByTagName('input')[0]
          // Below is to avoid mobile (soft) keyboard appearing
          inputEl.type = 'button'
        })
      },
      // deep: true,
      immediate: false
    },
    currentFieldValue: {
      handler(newValue, oldVal) {
        if (newValue) {
          this.localFieldValue = newValue
        } else {
          if (this.multiple) {
            this.localFieldValue = [this.fieldDetails.defaultValue]
          } else {
            this.localFieldValue = this.fieldDetails.defaultValue
          }
        }
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
      // let groupHeads = _.uniq(_.map(rawVals, "group_key"))
      let groupedVals = _.groupBy(rawVals, 'group_key')
      let emptyOpt = { name: '', value: '' }
      // this.fieldDetails.emptyValueText = "All"
      // style="pointer-events: none;" does not disable clicking
      // but passing in below with disabled set to true will
      if (this.fieldDetails.emptyValueText) {
        let groupHeadObj = {
          name: this.fieldDetails.emptyValueText,
          disabled: true,
          isGroupHead: true
        }
        // throws in the empty text group header line:
        selectItems.push(groupHeadObj)
        emptyOpt.name = this.fieldDetails.emptyValueText
        selectItems.push(emptyOpt)
      }

      Object.keys(groupedVals).forEach(function(groupHead) {
        let groupHeadObj = {
          name: groupHead,
          disabled: true,
          isGroupHead: true
        }
        // throws in a group header line
        selectItems.push(groupHeadObj)

        // _.sortBy(groupedVals[groupHead], "label")
        // above would have been case sensitive
        let sortedGroupedVals = _.sortBy(groupedVals[groupHead], function(val) {
          return val.label.toLowerCase()
        })
        sortedGroupedVals.forEach(function(optionKey) {
          let name = optionKey
          let val = optionKey

          if (optionsType === 'object_list') {
            // startCase below will capitalise each word
            // but will also remove accents
            name = _.startCase(optionKey.label)
            val = optionKey.global_key
          } else {
            name = optionKey
            // deburr below will remove accents
            val = _.deburr(optionKey)
          }

          selectItems.push({
            name: name,
            value: val
          })
        })
      })

      // let emptyOpt = { name: '', value: '' }
      // if (this.fieldDetails.emptyValueText) {
      //   emptyOpt.name = this.fieldDetails.emptyValueText
      // }
      return selectItems
    }
  },
  methods: {
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
      // encodeURI(selectKey)
      this.$emit('selectChanged', this.fieldDetails)
    }
  }
}
</script>