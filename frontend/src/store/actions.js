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
      console.log(sortKey)
      todos = _.sortBy(todos, sortKey);
      context.commit('todos', todos)
    });
  },
  // firestoreにデータを追加
  addTodo(context, { name, userId, deadline, color}) {
    this.db
      .collection("todos")
      .add({
        name: name,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        uid: userId,
        deadline: deadline,
        color: color
      })
      .then(function () {
        // 追加に成功したら、name を空にする
        name = "";
      })
      .catch(function () {
        // エラー時の処理
      });
  },
  //firestoreからデータを削除
  remove(context, id) {
    console.log(id)
    this.db.collection("todos").doc(id).delete().then(function () {
      console.log("Document successfully deleted!");
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
            // this.uid = user.uid;
            console.log("signIn uid ->" + user.uid)
            // console.log("aaaaaaa: "+ this.uid)
            context.commit('userId', user.uid)
            // ...
          } else {
            // User is signed out.
            // ...
          }
        });

        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          console.log(idToken)
        }).catch(function(error) {
          console.log(error)
        });
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
            console.log("signUp uid -> " + user.uid)
            context.commit('userId', user.uid)
          } else {
            // User is signed out.
            // ...
          }
        });

        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
          console.log(idToken)
        }).catch(function(error) {
          console.log(error)
        });
        // alert('Create account: ', user.email)
        // this.$router.push('/')
      })
      .catch(error => {
        console.log("singUp error -> " + error)
        alert("すでに登録されているメールアドレスです。")
      })
  },
  switchTodos(context, todosFlag){
    context.commit('todosFlag', todosFlag)
  }
}