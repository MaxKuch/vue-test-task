import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

window.users = [
  {
    _id: "118081982",
    name: "Калмыков Константин Константинович"
  },
  {
    _id:"122127054",
    name: "Постоев Юрий Николаевич"
  },
  {
    _id: "126509124",
    name: "Федосов Владимир Алексеевич"
  }
]

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
