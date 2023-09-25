import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/request'
import '@/utils/vant-ui'
import '@/style/commen.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
