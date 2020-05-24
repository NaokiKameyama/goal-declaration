import Vue from 'vue'
import Vuex from 'vuex'
import "firebase/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: 'Hello Vuex',
    displayName: '',
    email: ''
  },
  mutations: {
  },
  actions: {
  }
})
