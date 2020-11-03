import Vue from 'vue'
import Vuex from 'vuex'
import category from './category.js'
import contest from './contest.js'
Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    contest,
    category
  }
})
