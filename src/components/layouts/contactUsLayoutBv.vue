<template>
  <v-container fluid pa-0>
    <v-layout row wrap>
      <!-- Sidebard -->
      <v-flex xl3 md3 sm12 xs12 pa-0 class="sidebar bg">
      </v-flex>
      <!-- Main Property Results -->
      <v-flex xl6 md6 sm6 xs12 px-5 mt-5 pt-5 class="main-content">
          <div class="display-1">
            {{$ft("client_shared.labels.getInTouch") }}
          </div>

          <div class="headline" style="color: #868686;">
            {{$ft("client_shared.labels.anyQuestions") }}
          </div>
          <div class="subheading mb-3" style="color: #9a9a9a;">
            {{$ft("client_shared.labels.dontHesitate") }}
          </div>
        <InmoContactUsForm></InmoContactUsForm>
      </v-flex>
      <v-flex xl3 md3 sm6 xs12 mt-5 pt-5 pr-4 class="sidebar">
        <v-card class="mb-5 px-4 py-3 text-xs-center">
          <v-img       src="https://res.cloudinary.com/inmo-design/image/upload/v1560439674/logo-contact-form_cdjbx1.svg"
style="display:none" contain aspect-ratio="1" width="175" class="logo-contact"></v-img>
          <v-card-title primary-title>
            <span class="headline span-center details-title">Costa Specialist</span>
          </v-card-title>
          <v-card-text>
            <p>Avenida Carmen Saenz de Tejada, S/N, Edificio S208, Planta 1,
              Local 5A, 29651 Mijas
              Costa (Málaga)</p>
          </v-card-text>
          <v-card-actions>
            <v-btn style="" outlined block large color="#F7A100" dark>
              <v-icon>phone</v-icon> <a href="tel:+34 951 484 500">+34 951 484 500</a>
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn text small color="#F7A100">{{ $ft("client_shared.labels.mailUs") }}</v-btn> | <v-btn text small color="#F7A100" href="mailto:info@costaspecialist.com">info@costaspecialist.com</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <div class="c-iframe-map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3205.696524471727!2d-4.63568744446986!3d36.537315220586414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72d8012d5fdb87%3A0xb938d42784f0a69d!2sBuenavista+Homes!5e0!3m2!1ses!2snl!4v1553632035983" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>
      </v-flex>
    </v-layout>
    <v-layout style="display: none;" row wrap class="mb-3">
      <!--       <v-flex xs6>
        <v-flex v-if="$store.state.coreStore.currentPage.raw_html" justify-center xl10 offset-xl1 xs12>
          <div v-html="$store.state.coreStore.currentPage.raw_html"></div>
        </v-flex>
      </v-flex>
      <v-flex xs6>
        <template v-for="(clientFormConfig, index) in currentClientForms">
          <ClientForm :clientFormConfig="clientFormConfig"></ClientForm>
        </template>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>
<script>
// import ClientForm from '@/components/components-forms/ClientForm'
import InmoContactUsForm from '@/components/components-forms/InmoContactUsForm'
export default {
  components: {
    InmoContactUsForm,
    // ClientForm,
  },
  computed: {
    currentClientForms() {
      return this.$store.state.coreStore.currentClientForms
    },
    // currentPageParts() {
    //   return this.$store.state.coreStore.currentPageParts
    // }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-contact {
  margin: -80px auto 50px;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

.logo-contact-bottom {
  margin: -80px auto 10px;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

/** Contact Left Background **/
.sidebar.bg {
  background-image: url(https://res.cloudinary.com/inmo-design/image/upload/v1560439674/office-contact_xhuxkk.jpg) !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

/** Contant Map Location **/

.c-iframe-map {
  position: relative;
  padding-bottom: 35%;
  height: 0;
  overflow: hidden;
}

.c-iframe-map iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}
</style>