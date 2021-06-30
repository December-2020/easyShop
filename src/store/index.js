import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLoading:false,
  },
  mutations: {
    changeLoading(state,payload){
      state.showLoading=payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
