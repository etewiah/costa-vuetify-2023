<!-- extra level of abstraction that can be shared between edit
and view layouts -->
<template>
  <v-container pt-5 pb-5 grid-list-xl>
    <v-card class="inmo-card px-0 about_text my-5">
      <div class="px-5 pb-5" data-aos="fade-up">
        <v-img
          src="https://res.cloudinary.com/inmo-design/image/upload/v1560439674/logo-contact-form_cdjbx1.svg"
style="display:none"          contain
          aspect-ratio="1"
          width="175"
          class="logo-contact"
        ></v-img>
        <div class="headline mb-3 bold">
          <slot name="headerTitle"></slot>
        </div>
        <div class="our-service-description pl-3">
          <p class="p_left">
            <slot name="header"></slot>
          </p>
          <p class="p_left"></p>
        </div>
      </div>
      <v-card class="service-item">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex lg7 md12 sm12 service-description>
              <div data-aos-offset="-20" data-aos="zoom-in-left">
                <div class="headline mb-3">
                  <slot name="dreamhomeHeader"></slot>
                  <!-- We help you find your dream home -->
                </div>
                <div>
                  <p>
                    <slot name="dreamhome"></slot>
                    <!--                     When interested in buying a property in Malaga or on the
                    Costa del Sol it is very important to find a Real Estate
                    company that you feel comfortable with to help you with
                    your
                    property search. Costa Specialist enjoys being that
                    Company.
                    -->
                  </p>
                </div>
                <router-link
                  :to="$store.getters.standardPage('property-search')"
                  class="about-service"
                >
                  <router-link
                    :to="$store.getters.standardPage('property-search')"
                    class="about-service"
                  >
                    <v-btn color="#F7A100" dark>{{$ft("client_shared.labels.moreAbtService") }}</v-btn>
                  </router-link>
                </router-link>
              </div>
            </v-flex>
            <v-flex lg5 md12 sm12>
              <div data-aos="fade-right">
                <v-img
                  src="https://res.cloudinary.com/inmo-design/image/upload/v1560439674/property-search-services_diurqk.png"
                  aspect-ratio="1.37"
                ></v-img>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card class="service-item">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex lg7 md12 sm12 service-description>
              <div data-aos-offset="-20" data-aos="zoom-in-right">
                <div class="headline mb-3">
                  <slot name="viewingtripHeader"></slot>
                  <!-- Your Viewing Trip -->
                </div>
                <div>
                  <p>
                    <slot name="viewingtrip"></slot>
                  </p>
                </div>
                <router-link
                  :to="$store.getters.standardPage('viewing-trip')"
                  class="about-service"
                >
                  <v-btn color="#F7A100" dark>{{$ft("client_shared.labels.moreAbtService") }}</v-btn>
                </router-link>
              </div>
            </v-flex>
            <v-flex lg5 md12 sm12>
              <div data-aos="fade-left">
                <v-img
                  src="https://res.cloudinary.com/inmo-design/image/upload/v1560439675/viewing-trip-services_bityzz.jpg"
                  aspect-ratio="1.37"
                ></v-img>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card class="service-item">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex lg7 md12 sm12 service-description>
              <div data-aos-offset="-20" data-aos="zoom-in-left">
                <div class="headline mb-3">
                  <slot name="sellingHeader"></slot>
                  <!-- We help you selling your house -->
                </div>
                <div>
                  <p>
                    <slot name="selling"></slot>
                    <!--                     Costa Specialist is always on the look out for quality
                    properties to offer to our buying clients.
                    Working with an exclusive international clientele we
                    have a strong focus on quality properties which can be
                    sold at a market conform price level.
                    Prior to listing your property one of our consultants
                    will visit your property and conduct a property value
                    estimation.
                    -->
                  </p>
                </div>
                <router-link
                  :to="$store.getters.standardPage('selling-your-house')"
                  class="about-service"
                >
                  <v-btn color="#F7A100" dark>{{$ft("client_shared.labels.moreAbtService") }}</v-btn>
                </router-link>
              </div>
            </v-flex>
            <v-flex lg5 md12 sm12>
              <div data-aos="fade-right">
                <v-img
                  src="https://res.cloudinary.com/inmo-design/image/upload/v1560439674/property_sale-services_ttvyq5.jpg"
                  aspect-ratio="1.37"
                ></v-img>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card class="service-item">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex lg7 md12 sm12 service-description>
              <div data-aos-offset="-20" data-aos="zoom-in-right">
                <div class="headline mb-3">
                  <slot name="architecture"></slot>
                  <!-- Architectural Services -->
                </div>
                <div>
                  <p>
                    <slot name="architectureHeader"></slot>
                  </p>
                </div>
                <router-link
                  :to="$store.getters.standardPage('architectural-services')"
                  class="about-service"
                >
                  <v-btn color="#F7A100" dark>{{$ft("client_shared.labels.moreAbtService") }}</v-btn>
                </router-link>
              </div>
            </v-flex>
            <v-flex lg5 md12 sm12>
              <div data-aos="fade-left">
                <v-img
                  src="https://res.cloudinary.com/inmo-design/image/upload/v1560439673/architectural-services_aznjms.jpg"
                  aspect-ratio="1.37"
                ></v-img>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card class="service-item">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex lg7 md12 sm12 service-description energy-faq>
              <div data-aos-offset="-20" data-aos="zoom-in-left">
                <div class="headline mb-3">
                  <slot name="energycert"></slot>
                </div>
                <p>
                  <slot name="energycertHeader"></slot>
                </p>
              </div>
              <router-link
                :to="$store.getters.standardPage('energy-certificate')"
                class="about-service"
              >
                <v-btn color="#F7A100" dark>{{$ft("client_shared.labels.moreAbtService") }}</v-btn>
              </router-link>
            </v-flex>
            <v-flex md5 sm12>
              <div data-aos="fade-right">
                <v-img
                  src="https://res.cloudinary.com/inmo-design/image/upload/v1560439673/energy-services_hhyhb0.jpg"
                  aspect-ratio="1.37"
                ></v-img>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <v-card class="service-item">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex lg7 md12 sm12 service-description>
              <div data-aos-offset="-20" data-aos="zoom-in-right">
                <div class="headline mb-3">
                  <slot name="aftersales"></slot>
                  <!-- After Sales Services -->
                </div>
                <div>
                  <p>
                    <slot name="aftersalesHeader"></slot>
                  </p>
                </div>
                <router-link :to="$store.getters.standardPage('after-sales')" class="about-service">
                  <v-btn color="#F7A100" dark>{{$ft("client_shared.labels.moreAbtService") }}</v-btn>
                </router-link>
              </div>
            </v-flex>
            <v-flex lg5 md12 sm12>
              <div data-aos="fade-left">
                <v-img
                  src="https://res.cloudinary.com/inmo-design/image/upload/v1560439673/after-sales-services_qqmjfz.jpg"
                  aspect-ratio="1.37"
                ></v-img>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-card>
  </v-container>
</template>
<script>
export default {
  components: {},
  computed: {}
}
</script>
<style>
.logo-contact {
  margin: -80px auto 50px;
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.about_text {
  text-align: center;
}

.p_left {
  text-align: left;
}

.about-agent {
  margin-left: auto;
  margin-right: auto;
}

.bold {
  font-weight: bold;
}

.energy-faq .subheading {
  font-weight: bold;
}

.v-expansion-panel__header {
  background-color: #9acd33;
  color: white;
}

.service-item.v-card:nth-child(even) .layout.row.wrap {
  flex-direction: row-reverse;
}

.service-item.v-card:nth-child(even) {
  background-color: #e7f3d2;
}

.our-service-description {
  border-left: 3px solid #F7A100;
}

.service-description {
  align-self: center;
}
</style>