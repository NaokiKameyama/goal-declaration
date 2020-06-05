import Vue from 'vue'
import Vuex from 'vuex'
import "firebase/firestore"
import actions from "./actions"
import mutations from "./mutations"
import state from "./state"
import getters from "./getters"

Vue.use(Vuex)

export default new Vuex.Store({
  data:{
    // store内でdbを使い回すために定義
    db: null,
    uid: ""
  },
  state,
  mutations,
  actions,
  getters
})
