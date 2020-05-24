import Vue from 'vue'
import Vuex from 'vuex'
import "firebase/firestore"
import _ from 'lodash'
import firebase from "firebase";

Vue.use(Vuex)

export default new Vuex.Store({
  data:{
    db: null
  },
  state: {
    todos: []
  },
  mutations: {
    todos (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    init (context) {
      this.db = firebase.firestore();
      this.db.collection("todos").onSnapshot(function (querySnapshot) {
        var todos = [];
        querySnapshot.forEach(function (doc) {
          var data = doc.data();
          data.id = doc.id;
          todos.push(data);
        });
        // リストをcoud firestoerのcreatedをkeyにして昇順にソート
        todos = _.sortBy(todos, 'created');
        context.commit('todos', todos)
      });
    },
    addTodo(context, name){
      console.log(name)
      this.db
        .collection("todos")
        .add({
          name: name,
          created: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function () {
          // 追加に成功したら、name を空にする
          name = "";
        })
        .catch(function () {
          // エラー時の処理
        });
    },
    remove(context, id){
      console.log(id)
      this.db.collection("todos").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }
  }
})
