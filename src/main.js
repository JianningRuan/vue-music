import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: require( './assets/images/error.jpg'),//这个是请求失败后显示的图片
  loading: require('./assets/images/load.jpg')//这个是加载的loading过渡效果
})
import fastClick from 'fastclick'
fastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
