// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../style.css'
import store from './store'
import { Input, Upload } from 'element-ui'
// import VueTouch from 'vue-touch'
import Mint from 'mint-ui'
Vue.use(Mint)

Vue.config.productionTip = false

Vue.use(Upload)
Vue.use(Input)
// Vue.use(VueTouch)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
