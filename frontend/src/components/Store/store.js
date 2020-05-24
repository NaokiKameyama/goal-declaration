import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";
import "firebase/firestore";
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		name: "todos",
		count: 2,
		data: function () {
			return {
				db: null,
				name: "",
				todos: [],
			};
		}
	},
	created: function () {
		this.db = firebase.firestore();
    var _this = this;
    this.db.collection("todos").onSnapshot(function (querySnapshot) {
      _this.todos = [];
      querySnapshot.forEach(function (doc) {
        var data = doc.data();
        data.id = doc.id;
        _this.todos.push(data);
      });
      // リストをcoud firestoerのcreatedをkeyにして昇順にソート
			_this.todos = _.sortBy(_this.todos, 'created');
		});
	},
	getters: {
		doublecount: state => state.count * 2
	},
})
