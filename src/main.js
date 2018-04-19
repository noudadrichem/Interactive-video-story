import Vue from 'vue'
import router from './router'
import '@/assets/styles/master.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<router-view></router-view>'
})
