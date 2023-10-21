<template>
  <div class="container mt-4 info-boxes-cnt grid-list-xl">
    <div class="inmo-info-boxes v-card v-sheet theme--light">
      <div class="home-left-info">
        <div class="mt-4" style="">
          <img
            src="https://res.cloudinary.com/isabellatech/image/upload/v1602862552/PR-054-SI-23_10_12-984-1_1_cusvjm.png"
          />
        </div>
      </div>
      <div class="home-right-info">
        <div class="home-agency-info-content">
          <v-flex xl4 lg5 md12 sm12 xs12 pa-5>
            <span class="agency-info-header headline mb-5">
              <b>
                <span v-html="inmoInfoHeader"></span>
              </b>
            </span>
            <div class="agency-info-contact mt-4">
              <span v-html="inmoInfoContent"></span>
            </div>
          </v-flex>
        </div>
        <div class="home-page-contact-form">
          <InfoBoxContactUsForm></InfoBoxContactUsForm>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InfoBoxContactUsForm from '@jsroot/theme-marbella/components-forms/InfoBoxContactUsForm'
export default {
  components: { InfoBoxContactUsForm },
  props: {
    // currentPage: Object,
    isEditMode: Boolean,
  },

  // props: ['blockContents'],
  // data: () => ({
  //   showTrans: false,
  // }),
  // mounted: function () {
  //   var that = this
  //   setTimeout(function () {
  //     // debugger
  //     that.showTrans = true
  //   }, 500)
  // },
  computed: {
    slotValuesAll() {
      // let currentPageData = this.currentPage.current_locale_data || {}
      // let teamList = currentPageData.teamCarouselItems || []
      let activeLocale = this.$route.params.locale
      let slotValuesAll = {}
      if (this.isEditMode) {
        slotValuesAll = this.$store.getters.allEditSlotsForLocale(activeLocale)
      } else {
        slotValuesAll = this.$store.getters.allViewSlotsForLocale(activeLocale)
      }
      return slotValuesAll
    },
    // oct 2019 - might want to retrieve below from getters in vuex
    clientsSay() {
      return this.slotValuesAll['clientsSay'] || ''
    },
    inmoInfoContent() {
      return this.slotValuesAll['inmoInfoContent'] || ''
    },
    inmoInfoHeader() {
      return this.slotValuesAll['inmoInfoHeader'] || ''
    },
    teamList() {
      let teamList = []
      let teamCarouselItems = this.slotValuesAll['teamCarouselItems'] || {}
      Object.keys(teamCarouselItems).forEach(function (itemId) {
        teamList.push(teamCarouselItems[itemId])
      })
      return teamList
    },
  },
}
</script>
<style>
</style>