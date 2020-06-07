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
  addTodo(context, act_addtodo) {
    this.db
      .collection("todos")
      .add({
        name: act_addtodo.name,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        uid: act_addtodo.uid,
        deadline: act_addtodo.deadline,
        priority: act_addtodo.priority,
        urgent: act_addtodo.urgent,
        deleteFlag: act_addtodo.deleteFlag,
        achiveFlag: act_addtodo.achiveFlag
      }).then(function () {
      }).catch(function (error) {
        console.error("Error actions/addTodo : ", error);
      });
  },

  upDate(context, act_upDate) {
    this.db
      .collection("todos").doc(act_upDate.id).update(
      {
        name: act_upDate.name,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        uid: act_upDate.uid,
        deadline: act_upDate.deadline,
        priority: act_upDate.priority
      }).then(function () {
      }).catch(function (error) {
        console.error("Error actions/upDate : ", error);
      });
  },
  //firestoreからデータを削除
  remove(context, id) {
    this.db.collection("todos").doc(id).delete().then(function () {
    }).catch(function (error) {
      console.error("Error actions/remove : ", error);
    });
  },
  achive(context, id) {
    this.db
      .collection("todos").doc(id).update({
      achiveFlag : true
      }).then(function () {
      }).catch(function (error) {
        console.error("Error actions/achive : ", error);
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