<template>
  <v-card href="#testimonials" id="testimonials" class="inmo-card px-4 py-5 about_text my-5">
    <h1 class="headline bold mb-5">{{ $ft('client_shared.labels.testimonials') }}</h1>
    <v-card flat class="home-tabs testimonials-tabs">
      <v-layout wrap>
        <v-carousel :hide-delimiters="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm" class="property-thumb-gallery testimonials-carrousel">
          <v-carousel-item v-for="(item,i) in testimonials" :key="i">
            <v-card class="text-xs-center team-card">
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0 team-title">{{ item.title }}</h3>
                  <h2 class="headline mb-0 team-location">{{ item.location }}</h2>
                  <div class="team-subtitle">{{ item.description }}</div>
                </div>
              </v-card-title>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-layout>
    </v-card>
  </v-card>
</template>
<script>
// import EditPageDataModal from '@jsroot/shared-admin/components-edit/EditPageDataModal'
export default {
  components: {
    // EditPageDataModal
  },
  props: ['currentPage', 'isEditMode'],
  computed: {
    testimonials() {
      let testimonials = []
      let activeLocale = this.$route.params.locale
      let slotValuesAll = null
      // redundundt check for editmode??
      if (this.isEditMode) {
        slotValuesAll = this.$store.getters.allEditSlotsForLocale(activeLocale)
      } else {
        slotValuesAll = this.$store.getters.allViewSlotsForLocale(activeLocale)
      }

      let testimonialsList = slotValuesAll['testimonialsList'] || {}
      Object.keys(testimonialsList).forEach(function(testimonialId) {
        testimonials.push(testimonialsList[testimonialId])
      })
      return testimonials
    }
  },
  methods: {
    // hideEditDataModal() {
    //   this.editDataModalVisible = false
    // },
    // showEditDataModal() {
    //   this.editDataModalVisible = true
    // }
  },
  mounted() {},
  data() {
    return {
      // editDataModalVisible: false
    }
  }
}
</script>
<style>
.testimonials-carrousel {
  background-image: url('https://res.cloudinary.com/inmo-design/image/upload/f_auto,q_auto/v1560439675/team-bk-tab_m7gmf8.jpg');
  background-size: cover;
}
.testimonials-tabs .testimonials-carrousel .team-title {
  color: #F7A100;
  font-weight: bold;
  font-size: 28px !important;
  margin-bottom: 10px !important;
}

.testimonials-tabs > .layout.wrap {
  background-color: aliceblue;
}

.testimonials-tabs .testimonials-carrousel .team-location {
  color: #222222;
  font-weight: bold;
  font-size: 20px !important;
  margin-bottom: 15px !important;
}

.testimonials-tabs .testimonials-carrousel .team-subtitle {
  font-size: 18px;
  /*color: #434343;*/
  color: white;
}

.testimonials-tabs .testimonials-carrousel .team-card {
  background-color: transparent;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 3%;
  padding-bottom: 10%;
}

.testimonials-tabs .v-carousel__next .v-icon,
.testimonials-tabs .v-carousel__prev .v-icon {
  color: #434343;
}
</style>