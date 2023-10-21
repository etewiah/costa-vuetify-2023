import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'
import i18n from './i18n'


// import 'vuetify/src/stylus/app.styl'
// july 2019 - below replaced with
// import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import '@/assets/css/marbella.css'
import '@/assets/css/hussein_extra.css'
// https://vuetifyjs.com/en/framework/icons#installing-fonts
// import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
// PageSpeed advices removing above as its top recommendation for improving performance
// Consider using <link rel=preload> to prioritize fetching resources that are currently requested 



Vue.config.productionTip = false

import FastI18n from '@/plugins/FastI18n'
Vue.use(FastI18n)

new Vue({
  vuetify,
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
