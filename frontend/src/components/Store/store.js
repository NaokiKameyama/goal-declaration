import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		count: 2
	}
})

// import Firebase from 'Firebase'
// import 'Firebase/firestore'
// Vue.use(Vuex)
//   const state = {
//   db: Firebase.firestore()
// }
// export default new Vuex.Store({
//   state,
//   modules: {}
// })