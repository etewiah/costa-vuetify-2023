<!-- eslint-disable vue/no-useless-template-attributes -->
<template>
  <v-card style="display: block" class="inmo-card px-3 py-3 mb-5">
    <!--     <v-card-title primary-title>
      <span class="headline">
      </span>
    </v-card-title> -->
    <v-layout :class="hideTop ? 'd-none' : ''" row wrap>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title primary-title>
            <span class="subheading details-title">
              <v-icon>home</v-icon>
              {{ $ft("client_shared.fieldLabels.propDetails") }}
            </span>
          </v-card-title>
          
          <template v-for="(fieldDetails, index) in leftFields" class="details-col pa-3">
            <ListingDetailsTableItem
                          :key="index"

              :isPromotion="isPromotion"
              :fieldDetails="fieldDetails"
              :currentProperty="currentProperty"
            ></ListingDetailsTableItem>
          </template>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-card-title primary-title>
            <span class="subheading details-title">
              <v-icon>assignment</v-icon>
              {{ $ft("client_shared.fieldLabels.pricesAndLoc") }}
            </span>
          </v-card-title>
          <!--           <v-card-actions class="details-col pa-3">
            <span>Price</span>
            <v-spacer></v-spacer><span><b>150.000€</b> <del>(160.000€)</del></span>
          </v-card-actions> -->

          <template
            v-for="(fieldDetails, index) in rightFields"
            class="details-col pa-3"
          >
            <ListingDetailsTableItem
              :key="index"
              :fieldDetails="fieldDetails"
              :currentProperty="currentProperty"
            ></ListingDetailsTableItem>
          </template>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout :class="hideBottom ? 'd-none' : ''" row wrap>
      <v-flex xs12 category-container>
        <v-layout row wrap>
          <v-flex
            v-for="(cat, index) in listingCats"
            :key="index"
            :class="hideTop ? 'xs12 sm6' : 'xs12 sm6 md4 xl3'"
            single-category-container
          >
            <v-card flat>
              <v-card-title primary-title>
                <span class="subheading details-title category-title">
                  <v-icon>place</v-icon
                  >{{ cat["@attributes"] ? cat["@attributes"].Type : "" }}
                </span>
              </v-card-title>
              <template v-if="Array.isArray(cat.Value)">
                <v-card-actions
                  v-for="(label, index) in cat.Value"
                  :key="index"
                  class="category-col pa-0"
                >
                  <span>{{ label }}</span>
                </v-card-actions>
              </template>
              <v-card-actions v-else class="category-col pa-0">
                <span>{{ cat.Value }}</span>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
import _ from "lodash"
import ListingDetailsTableItem from "@/components/components-resales/ListingDetailsTableItem"
export default {
  components: {
    // DisplayEnergyRating,
    ListingDetailsTableItem,
    // DisplayPriceLegacy,
    // DisplayFee
  },
  props: ["currentProperty", "isPromotion", "hideTop", "hideBottom"],
  data: () => ({
    leftFields: [
      {
        labelTKey: "client_shared.fieldLabels.ref",
        fieldKey: "Reference",
      },
      {
        labelTKey: "client_shared.fieldLabels.propertyType",
        // fieldKey: "ROLType"
        fieldKey: "Type",
      },
      {
        labelTKey: "client_shared.fieldLabels.bedrooms",
        fieldKey: "Bedrooms",
      },
      {
        labelTKey: "client_shared.fieldLabels.bathrooms",
        fieldKey: "Bathrooms",
      },
      {
        labelTKey: "client_shared.fieldLabels.builtArea",
        fieldKey: "Built",
      },
      {
        labelTKey: "client_shared.fieldLabels.terraceArea",
        fieldKey: "Terrace",
      },
      {
        labelTKey: "client_shared.fieldLabels.gardenArea",
        fieldKey: "GardenPlot",
      },
    ],
    rightFields: [
      {
        labelTKey: "client_shared.fieldLabels.price",
        fieldType: "price",
        fieldKey: "Price",
      },
      {
        labelTKey: "client_shared.fieldLabels.communityFees",
        fieldType: "fee",
        fieldKey: "Community_Fees_Year",
      },
      {
        labelTKey: "client_shared.fieldLabels.garbageTax",
        fieldType: "fee",
        fieldKey: "Basura_Tax_Year",
      },
      {
        labelTKey: "client_shared.fieldLabels.ibiTax",
        fieldType: "fee",
        fieldKey: "IBI_Fees_Year",
      },
      {
        labelTKey: "client_shared.fieldLabels.zone",
        fieldKey: "Area",
      },
      {
        labelTKey: "client_shared.fieldLabels.city",
        fieldKey: "Location",
      },
      {
        labelTKey: "client_shared.fieldLabels.energyRating",
        fieldType: "energyRating",
        fieldKey: "EnergyRating",
      },
    ],
  }),
  mounted: function () {},
  computed: {
    listingCats() {
      let listingCats = this.currentProperty.PropertyFeatures
        ? this.currentProperty.PropertyFeatures.Category
        : []
      // fecking resales sometimes return an array and sometimes not
      if (Array.isArray(listingCats)) {
        // _.groupBy(rawVals, "group_key")
        let orderedListingCats = _.sortBy(listingCats, [
          function (cat) {
            return Array.isArray(cat.Value) ? cat.Value.length : 0
          },
        ])
        // Fecking dumbarse resales - sometimes the value within
        // a single cat will be an array and sometimes a single string!!
        // Hence the awkward sorting function above
        return orderedListingCats
      } else {
        return [listingCats]
      }
    },
  },
}
</script>
<style scoped></style>
