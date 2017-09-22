// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../style.css'
import store from './store'
import { Input, Upload } from 'element-ui'
// import VueTouch from 'vue-touch'
import { Button, Cell, Header, InfiniteScroll, Popup, Field } from 'mint-ui'

Vue.config.productionTip = false

Vue.use(Upload)
Vue.use(Input)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
Vue.component(Header.name, Header)
Vue.component(Popup.name, Popup)
Vue.use(InfiniteScroll)
// Vue.use(VueTouch)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
