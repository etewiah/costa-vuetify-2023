<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-container fluid pa-0>
    <v-img
      :aspect-ratio="16/6"
      src="https://res.cloudinary.com/isabellatech/image/upload/v1603105634/7ebaee2e369b3af2b6dd72e80dfbec0d_zfrw3u.jpg"
    >
      <!-- >changed -->
      <v-layout pa-0 align-end fill-height class="lightbox white--text" wrap>
        <!-- >changed -->
        <v-flex xs12 px-3 style="margin-top: 10%">
          <div style v-html="preRen" v-if="preRen"></div>
          <v-card v-else class="home-search semidark-background px-4" flat dark>
            <!-- >changed -->
            <v-container px-2 pt-4 pb-1>
              <!-- >changed -->
              <v-layout>
                <v-card-title
                  flat
                  class="headline font-weight-regular white--text pa-0"
                >{{ $ft('client_shared.labels.searchTrough') }}</v-card-title>
              </v-layout>
            </v-container>
            <v-form>
              <v-container>
                <v-layout wrap>
                  <template v-for="(fieldDetails, index) in sortedSearchFields">
                    <v-flex
                      v-if="fieldDetails.placement === 'primary'"
                      :key="fieldDetails.fieldName"
                      :class="[fieldDetails.classNames]"
                    >
                      <!-- <PriceSelectHero
                        v-if="fieldDetails.inputType == 'priceText'"
                        :multiple="fieldDetails.isMultipleSelect"
                        :fieldDetails="fieldDetails"
                      ></PriceSelectHero>
                      <AutoCompleteFieldHeroGrouped
                        v-else-if="fieldDetails.isGroupedSelect"
                        :multiple="false"
                        :index="index"
                        :interacted="interacted"
                        :fieldDetails="fieldDetails"
                        :fieldOptions="searchSelectOptions"
                      ></AutoCompleteFieldHeroGrouped>
                      <AutoCompleteFieldHero
                        v-else
                        :multiple="fieldDetails.isMultipleSelect"
                        :index="index"
                        :interacted="interacted"
                        :fieldDetails="fieldDetails"
                        :fieldOptions="searchSelectOptions"
                      ></AutoCompleteFieldHero> -->
                    </v-flex>
                  </template>
                  <v-flex xs12 md2 lg2 xl1 px-0>
                    <v-btn
                      class="home-search-button"
                      large
                      depressed
                      block
                      color="#F7A100"
                      @click="redirToSearch()"
                    >{{ $ft('client_shared.labels.search') }}</v-btn>
                  </v-flex>
                  <template v-for="(fieldDetails) in sortedSearchFields">
                    <v-flex
                      v-if="fieldDetails.placement === 'secondary'"
                      :key="fieldDetails.fieldName"
                      :class="[fieldDetails.classNames]"
                    >
                      <v-text-field
                        v-if="fieldDetails.inputType === 'text'"
                        v-model="listingRefNo"
                        :multi-line="false"
                        :rules="fieldDetails.validationRules"
                        :prepend-icon="fieldDetails.iconName"
                        :label="$ft(fieldDetails.labelTextTKey)"
                      ></v-text-field>
                      <v-select
                        v-else
                        v-model="fieldDetails.defaultValue"
                        :items="fieldDetails.optionsValues"
                        :label="$ft(fieldDetails.labelTextTKey)"
                        :class="fieldDetails.iconName"
                        :prepend-icon="fieldDetails.iconName"
                        color="#F7A100"
                        menu-props="offsetY"
                      ></v-select>
                    </v-flex>
                  </template>
                  <v-spacer></v-spacer>
                  <v-flex xs12 md2 xl1 px-0>
                    <v-btn block flat v-on:click="showAdvSearch = !showAdvSearch">
                      {{ $ft('client_shared.labels.advSearch') }}
                      <v-icon>chevron_right</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row wrap v-if="showAdvSearch">
                  <v-flex xs12>
                    <div class="text-xs-left py-2 subheading">
                      <span
                        class="group-head-text"
                        style="text-transform: uppercase;"
                      >{{ $ft('client_shared.labels.featuredSearch') }}</span>
                    </div>
                  </v-flex>
                  <template v-for="(fieldDetails, index) in sortedSearchFields">
                    <v-flex
                      v-if="fieldDetails.placement === 'advanced'"
                      :key="fieldDetails.feature_key"
                      md3
                      sm4
                      xs6
                      py-0
                      px-2
                    >
                      <v-checkbox
                        class="mt-0"
                        dark
                        row="true"
                        :label="fieldDetails.labelText"
                        v-model="fieldDetails.newValue"
                        color="#F7A100"
                      ></v-checkbox>
                    </v-flex>
                  </template>
                </v-layout>
              </v-container>
            </v-form>
          </v-card>
        </v-flex>
        <v-flex xs12 mb-5>
          <!--   city boxes had been here -->
        </v-flex>
        <v-flex xs12 py-2 style="background-color: #ffffff99;">
          <v-layout wrap>
            <v-flex md6 sm6 xs12 text-sm-right text-xs-center pr-3>
              <span class="subheading header-sub">{{ $ft('client_shared.hero.bestExposure') }}</span>
            </v-flex>
            <v-flex md4 sm6 xs12 pl-3 text-sm-left text-xs-center>
              <v-btn :to="$store.getters.contactUsPage" depressed color="#F7A100" dark>
                <!-- When user click, send to the about page -->
                <v-icon>person</v-icon>
                {{ $ft('client_shared.hero.contactAgents') }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-img>
    <!-- <EventReactor event="mouseenter" @fired="onElInteracted" /> -->
  </v-container>
</template>
<script>
import _ from 'lodash'
// import EventReactor from '@jsroot/shared/frames/EventReactor.js'
// import PriceSelectHero from '@jsroot/shared/components-form-fields/PriceSelectHero'
// import AutoCompleteFieldHero from '@jsroot/shared/components-form-fields/AutoCompleteFieldHero'
// import AutoCompleteFieldHeroGrouped from '@jsroot/shared/components-form-fields/AutoCompleteFieldHeroGrouped'

export default {
  components: {
    // EventReactor,
    // PriceSelectHero,
    // AutoCompleteFieldHeroGrouped,
    // AutoCompleteFieldHero
  },
  props: ['searchFields', 'searchSelectOptions'],
  methods: {
    onElInteracted(e) {
      this.interacted = true
    },
    // redirToListing(listingRefNo) {
    //   // For reference field...
    //   let rParams = this.$route.params
    //   rParams.locale = this.$store.state.coreStore.currentLocale
    //   rParams.preamble = this.$store.getters.listingPreamble
    //   rParams.slugOrId = listingRefNo
    //   this.$router.push({ name: 'resalesDetails', params: rParams })
    // },
    // Previously was triggering above immediately when ref changed...
    redirToSearch(fieldDetails) {
      let rParams = this.$route.params || {}
      if (this.listingRefNo.length > 3) {
        // For reference field...
        //  this.$route.params || {}
        rParams.locale = this.$store.state.coreStore.currentLocale
        rParams.preamble = this.$store.getters.listingPreamble
        rParams.slugOrId = this.listingRefNo
        this.$router.push({ name: 'resalesDetails', params: rParams })
        return
      }
      let queryParams = {}
      let features = ''
      this.searchFields.forEach(function(fieldDetails) {
        // if (fieldDetails.inputType === "slider") {} else {}
        var paramVal = fieldDetails.newValue || fieldDetails.defaultValue
        if (paramVal) {
          if (fieldDetails.fieldName === 'features') {
            if (features.length < 1) {
              features = fieldDetails.feature_key
            } else {
              features += ',' + fieldDetails.feature_key
            }
            // } else if (fieldDetails.fieldName === "priceRange") {
            //   let priceRangeParams = paramVal.split("-")
            //   if (priceRangeParams && (priceRangeParams.length === 2)) {
            //     queryParams["price_min"] = priceRangeParams[0]
            //     queryParams["price_max"] = priceRangeParams[1]
            //   }
          } else {
            queryParams[fieldDetails.queryStringName] = paramVal.toString()
            // .toString() above will create csv from multiple select values for city
          }
        }
      })
      if (features.length > 1) {
        queryParams['features'] = features
      }
      // let rParams = this.$route.params
      rParams.locale = this.$store.state.coreStore.currentLocale
      rParams.preamble = this.$store.getters.listingPreamble
      this.$router.push({
        name: 'resalesSearch',
        query: queryParams,
        params: rParams
      })
    }
  },
  computed: {
    preRen() {
      return false
    },
    // searchLinkMarbella() {
    //   return {
    //     name: 'resalesSearch',
    //     query: {
    //       city:
    //         'San Pedro de Alcantara,Puerto Banus,Nueva Andalucia,La Campana,Aloha,Las Brisas,Marbella,The Golden Mile,Sierra Blanca,Nagueles,Torre Real,Rio Real,Bahia de Marbella,Santa Clara,Los Monteros,Altos de los Monteros,Las Chapas,Hacienda Las Chapas,El Rosario,Costabella,La Mairena,Reserva de Marbella,Elviria,Marbesa,Carib Playa,Artola,Cabopino,Puerto de Cabopino,Cortijo Blanco'
    //     },
    //     params: {
    //       locale: this.$store.state.coreStore.currentLocale,
    //       preamble: this.$store.getters.listingPreamble
    //     }
    //   }
    // },
    // searchLinkMijas() {
    //   return {
    //     name: 'resalesSearch',
    //     query: {
    //       city:
    //         'Calahonda,Calypso,Riviera del Sol,Miraflores,Torrenueva,La Cala de Mijas,Calanova Golf,La Cala,La Cala Golf,La Cala Hills,El Chaparral,El Faro,Mijas Costa,Mijas,Mijas Golf,Valtocado,Cerros del Aguila'
    //     },
    //     params: {
    //       locale: this.$store.state.coreStore.currentLocale,
    //       preamble: this.$store.getters.listingPreamble
    //     }
    //   }
    // },
    // searchLinkBenalmadena() {
    //   return {
    //     name: 'resalesSearch',
    //     query: {
    //       city:
    //         'La Capellania,Torremar,Torrequebrada,Torremuelle,Benalmadena Costa,Benalmadena Pueblo,Benalmadena,Arroyo de la Miel'
    //     },
    //     params: {
    //       locale: this.$store.state.coreStore.currentLocale,
    //       preamble: this.$store.getters.listingPreamble
    //     }
    //   }
    // },
    // searchLinkEstepona() {
    //   return {
    //     name: 'resalesSearch',
    //     query: {
    //       city:
    //         'Manilva,Punta Chullera,La Duquesa,San Luis de Sabinillas,Casares,Casares Playa,Casares Pueblo,Dona Julia,Estepona,Valle Romano,New Golden Mile,Benamara,El Padron,El Presidente,Bel Air,Selwo,Costalita,Benavista,Diana Park,Atalaya,Valle del Sol,Guadalmina Alta,Guadalmina Baja,Hacienda del Sol,Cancelada,El Paraiso'
    //     },
    //     params: {
    //       locale: this.$store.state.coreStore.currentLocale,
    //       preamble: this.$store.getters.listingPreamble
    //     }
    //   }
    // },
    // searchLinkBenahavis() {
    //   return {
    //     name: 'resalesSearch',
    //     query: {
    //       city:
    //         'Benahavis,La Heredia,El Madronal,La Zagaleta,Los Arqueros,Monte Halcones,La Quinta,Los Flamingos,Monte Halcones'
    //     },
    //     params: {
    //       locale: this.$store.state.coreStore.currentLocale,
    //       preamble: this.$store.getters.listingPreamble
    //     }
    //   }
    // },
    sortedSearchFields() {
      return _.sortBy(this.searchFields, 'sortOrder')
    }
  },
  data: () => ({
    interacted: false,
    showAdvSearch: false,
    listingRefNo: '',
    showTrans: true
  }),
  mounted: function() {}
}
</script>
<style>
.home-search
  .hot_tub
  .v-input__prepend-outer
  i.v-icon.material-icons.theme--dark {
  color: transparent !important;
  background-image: url(https://img.icons8.com/ios/50/000000/shower-and-tub-filled.png);
  background-size: contain;
  height: 20px;
  position: relative;
  top: -2px;
  -webkit-filter: invert(100%);
  filter: invert(100%);
}

.home-tabs .contact-title {
  color: #F7A100;
  font-weight: bold;
  font-size: 28px !important;
  margin-bottom: 15px !important;
}

.home-tabs .contact-subtitle {
  font-size: 18px;
  margin-bottom: 25px !important;
}

.city-box .headline {
  font-size: 20px !important;
  font-weight: bold;
}

.city-box .semidark-background:hover {
  background-color: #4d651cc9 !important;
}

@media (min-width: 1264px) {
  .flex.city-box {
    flex-basis: 20%;
    flex-grow: 0;
    max-width: 20%;
  }
}

@media (min-width: 1904px) {
  .flex.city-box {
    flex-basis: 16.666666666666664%;
    flex-grow: 0;
    max-width: 16.666666666666664%;
  }
}

/*above from 29 apr 2019 update*/

.search-btn-lg {
  background: #F7A100;
  cursor: pointer;
  padding: 2% 0%;
}

.search-wrap {
  background: white;
  /*border-radius: 4px;*/
}

/** Call to action on header **/

.header-sub {
  top: 50%;
  transform: translateY(-50%);
  color: black;
  display: block;
  position: relative;
}

/*below for home hero*/

.home-header {
  height: 70vh;
}

/*.home-search {
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}*/

.home-field.hf-left .v-input__slot {
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-right: 1px solid rgb(230, 230, 230);
}

.home-field.hf-center .v-input__slot {
  border-radius: 0 !important;
  border-left: 1px solid rgb(230, 230, 230);
  border-right: 1px solid rgb(230, 230, 230);
}

.home-field.hf-right .v-input__slot {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

.home-search-button {
  height: 65px !important;
  margin: 0 !important;
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

.semidark-background {
  background-color: #13131385 !important;
}

/*end of home hero styles*/
</style>