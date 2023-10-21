<template>
  <div class="elevation-0">
    <!-- <CallbackFormModal
      @hideCurrentModal="hideCallbackModal"
      :currentModalVisible="callbackModalVisible"
    ></CallbackFormModal> -->
    <!-- Main Menu (no mobile) -->
    <div style v-html="preRen" v-if="preRen"></div>
    <v-toolbar
      v-else
      :fixed="topNavFixed"
      text
      class="main-toolbar hidden-sm-and-down"
      :absolute="isHomePage"
      style="background-color: #f7a100"
    >
      <router-link
        :to="{
          name: homeRoute,
          params: { locale: $store.state.coreStore.currentLocale },
        }"
      >
        <img
          v-if="isHomePage"
          src="@/assets/images/costasp/COSTA SPECIALIST LOGO white.png"
          class="mx-3 mt-3"
          contain
          height="48"
        />
        <img
          v-else
          src="@/assets/images/costasp/COSTA SPECIALIST LOGO white.png"
          class="mx-3 mt-3"
          contain
          height="48"
        />
      </router-link>
      <v-toolbar-items class="mr-3 main-nav">
        <template v-for="(item, index) in navLinks">
          <MainNavBtnMdUp :key="index" :item="item"></MainNavBtnMdUp>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="mr-4">
        <v-btn
          @click="showCallbackModal"
          style
          text
          class="mr-3 request-callback bg-screen"
        >
          <span class="mr-2 hidden-md-and-down">{{
            $ft('client_shared.labels.requestCallback')
          }}</span>
          <v-icon class="outlined">phone_iphone</v-icon>
        </v-btn>
        <v-btn
          :to="$store.getters.favouritesPage"
          exact-active-class="actual"
          style
          text
          class="mr-3 request-callback bg-screen"
        >
          <span class="mr-2 hidden-md-and-down">{{
            $ft('client_shared.labels.favs')
          }}</span>
          <v-icon class="outlined">star</v-icon>
        </v-btn>
        <LangSwitcherDesk></LangSwitcherDesk>
      </v-toolbar-items>
    </v-toolbar>
    <div class="container pa-0">
      <v-toolbar class="hidden-md-and-up pt-1 elevation-0">
        <v-menu bottom left>
          <v-btn icon slot="activator" @click.stop="drawer = !drawer" class>
            <v-icon>reorder</v-icon>
          </v-btn>
        </v-menu>
        <v-spacer></v-spacer>
        <v-toolbar-title
          style="background-color: #f7a100"
          class="top_logo_ct_sm"
        >
          <div class="top_logo_sm pt-0">
            <router-link :to="{ name: 'homePage', params: {} }">
              <img
                style="max-width: 80%"
                src="@/assets/images/costasp/COSTA SPECIALIST LOGO white.png"
              />
            </router-link>
            <v-btn
              class="top_fav_sm"
              small
              fab
              style
              :to="$store.getters.favouritesPage"
            >
              <v-icon class="outlined">star</v-icon>
            </v-btn>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-navigation-drawer
        class="hidden-md-and-up"
        v-model="drawer"
        fixed
        temporary
      >
        <v-list class="pt-5">
          <LangSwitcherMobile></LangSwitcherMobile>
          <template v-for="(item, index) in navLinks">
            <MainNavBtnSmDown :key="index" :item="item"></MainNavBtnSmDown>
          </template>
        </v-list>
      </v-navigation-drawer>
    </div>
    <!-- <EventReactor event="mouseenter" @fired="onElInteracted" /> -->
  </div>
</template>
<script>
// // import EventReactor from '@jsroot/shared/frames/EventReactor.js'
// import SignInNav from '@/components/components-nav/SignInNav'
import MainNavBtnMdUp from '@/components/components-nav/main-nav-level1/BtnMdUp'
import LangSwitcherDesk from '@/components/components-nav/LangSwitcherDesk'
import LangSwitcherMobile from '@/components/components-nav/LangSwitcherMobile'
import MainNavBtnSmDown from '@/components/components-nav/main-nav-level1/BtnSmDown'
// import CallbackFormModal from '@jsroot/shared/components-forms/CallbackFormModal'

export default {
  data() {
    return {
      interacted: false,
      drawer: false,
      topNavFixed: false,
      callbackModalVisible: false,
    }
  },
  components: {
    // EventReactor,
    // CallbackFormModal,
    LangSwitcherDesk,
    // SignInNav,
    MainNavBtnMdUp,
    MainNavBtnSmDown,
    LangSwitcherMobile,
  },
  props: ['navLinks'],
  methods: {
    onElInteracted(e) {
      this.interacted = true
    },
    showCallbackModal() {
      this.callbackModalVisible = true
    },
    hideCallbackModal() {
      this.callbackModalVisible = false
    },
    onNavScroll(e) {
      // Jan 2019 - disabling as not working so great
      // Was triggered by v-scroll="onNavScroll"
      // on the root div
      // // Get the navbar
      // var navbar = this.$el
      // // .getElementsByClassName("toolbar-cont")[0]
      // var pageTopOffset = window.pageYOffset
      // // Get the offset position of the navbar
      // var sticky = navbar.offsetTop + 90
      // // console.log(pageTopOffset)
      // // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
      // if (pageTopOffset >= sticky) {
      //   this.topNavFixed = true
      //   // navbar.classList.add("sticky")
      // } else {
      //   this.topNavFixed = false
      //   // navbar.classList.remove("sticky")
      // }
    },
  },
  computed: {
    preRen() {
      // Apr 2020 - disabling this
      return false
      // if (this.interacted || !this.isHomePage) {
      //   return false
      // }
      // let preRenderedFrag = this.$store.state.coreStore.preRenderedFrag
      // if (
      //   preRenderedFrag &&
      //   this.$store.state.coreStore.currentLocale == 'en'
      // ) {
      //   let headerHtml = preRenderedFrag.querySelector('.main-toolbar')
      //   return headerHtml.outerHTML
      // } else {
      //   return false
      // }
    },
    isHomePage() {
      return ['homePage', 'landing'].includes(this.$route.name)
      // this.$route.name === "homePage"
    },
    // mainClasses() {
    //   if (this.isHomePage) {
    //     return 'white main-toolbar hidden-sm-and-down semidark-background'
    //   } else {
    //     return 'white main-toolbar hidden-sm-and-down'
    //   }
    // },
    // logoUrl() {
    //   if (this.isHomePage) {
    //     return "https://i.imgur.com/JXaZBnU.png"
    //   } else {
    //     return "~@/assets/images/buenavista-logo-header.svg"
    // - couldn't get above which should server from webpacker
    // assets to work
    //     // return "/assets/images/buenavista-logo-header.svg"
    //   }
    // },
    homeRoute() {
      return 'landing'
    },
  },
}
</script>
<style>
.top_logo_ct_sm {
  overflow: initial;
}
.v-btn--active:before,
.v-btn:focus:before,
.v-btn:hover:before {
  background-color: white;
}

.application .theme--light.toolbar,
.theme--light .toolbar {
  background-color: transparent;
}

.fixable-bar {
  /* below is enough to stop search sliders seeping through fixed header*/
  z-index: 6;
  /*background-color: lightgray;*/
  /*background-image: url(/assets/malaga-silueta.jpg) !important;*/
  background-position: center bottom;
  background-repeat: no-repeat;
}

.fixable-bar {
  /*text-align: center;*/
}

.top_fav_sm {
  margin-top: -30px;
  padding: 10px;
}

.top_logo,
.top_logo_sm {
  text-align: center;
  padding-top: 10px;
}

.top_logo_sm img {
  height: 50px;
}

.malaga-toolbar {
  /*height: 30px;*/
}

.my-flat {
  box-shadow: none !important;
  border-radius: 4px;
}

/*@media only screen and (max-width: 768px) {
*/

@media only screen and (max-width: 959px) {
  /*  .main-logo {
    height: 56px;
  }
*/
  .toolbar-cont {
    height: 75px;
    background-size: cover;
  }
}
</style>