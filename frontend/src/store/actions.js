import "firebase/firestore"
import _ from 'lodash'
import firebase from "firebase";

export default {
  // firestoreの初期化
  init(context, sortKey) {
    this.db = firebase.firestore();
    // DBに接続 (コネクションは張りっぱなし？)
    this.db.collection("todos").onSnapshot(function (querySnapshot) {
      var todos = [];
      querySnapshot.forEach(function (doc) {
        var data = doc.data();
        data.id = doc.id;
        // firestoreの内のデータをtodosに格納
        todos.push(data);
      });
      // リストをcoud firestoerのcreatedをkeyにして昇順にソート
      todos = _.sortBy(todos, sortKey);
      context.commit('todos', todos)
    });
  },
  // firestoreにデータを追加
  addTodo(context, { name, uid, deadline, priority, urgent, deleteFlag, achiveFlag}) {
    this.db
      .collection("todos")
      .add({
        name: name,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        uid: uid,
        deadline: deadline,
        priority: priority,
        urgent: urgent,
        deleteFlag: deleteFlag,
        achiveFlag: achiveFlag
      })
      .then(function () {
      })
      .catch(function () {
        // エラー時の処理
      });
  },

  upDate(context, { id, name, uid, deadline, priority}) {
    this.db
      .collection("todos")
      .doc(id)
      .update(
      {
        name: name,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        uid: uid,
        deadline: deadline,
        priority: priority
      })
      .then(function () {
      })
      .catch(function () {
        // エラー時の処理
      });
  },
  //firestoreからデータを削除
  remove(context, id) {
    this.db.collection("todos").doc(id).delete().then(function () {
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  },
  // サインイン
  signIn(context, {username, password}){
    firebase.auth().signInWithEmailAndPassword(username, password).then(
      () => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            context.commit('signInUp',{uid: user.uid, email: user.email})
            // ...
          } else {
            // User is signed out.
            // ...
          }
        });

        // firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        //   console.log(idToken)
        // }).catch(function(error) {
        //   console.log(error)
        // });
      },
      err => {
        alert(err.message)
      }
    )
  },
  signUp(context, {username, password}){
    firebase.auth().createUserWithEmailAndPassword(username, password).then(
      () => {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            context.commit('signInUp',{uid: user.uid, email: user.email})
          } else {
            // User is signed out.
            // ...
          }
        });

        // firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
        //   console.log(idToken)
        // }).catch(function(error) {
        //   console.log(error)
        // });
      })
      .catch(error => {
        alert(error.message)
      })
  },
  signOut(context){
    firebase.auth().signOut().then(() => {
    })
    context.commit('signOut')
  },
  switchTodos(context, todosFlag){
    context.commit('todosFlag', todosFlag)
  }
}